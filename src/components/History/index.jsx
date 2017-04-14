import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Measure from 'react-measure'
import { observer } from 'mobx-react'
import { WithContext as Tags } from 'react-tag-input'
import UpIcon from 'react-icons/lib/md/arrow-upward'
import debounce from 'debounce'


import { PRIMARY } from '../../utils'
import state from '../../stores'
import { Gallery } from '../Gallery'
import CoverComponent from './CoverComponent'
import { intersection } from '../../utils'

let Div = styled.div`
  position: relative;
  flex-basis: 100%;
  padding: 32px;
  
`

let H1 = styled.h1`
  color: ${PRIMARY};
  align-self: center;
`

let SearchWrapper = styled.div`
  position: relative;
  margin: 32px 30%;
  z-index: 1000;
`

let ChangeSource = styled.a`
  display: inline-block;
  width: 60px;
  margin-right: 12px;
  color: ${PRIMARY};
  font-weight: 500;
  font-size: 1.2em;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

let BackToTopWrapper = styled.div`
  position: fixed;
  visibility: ${props => props.hidden? 'hidden' : 'inherit'};
  right: 64px;
  bottom: 64px;
  height: 60px;
  width: 60px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, .3) 0px 1px 7px 0px;
  text-align: center;
  border-radius: 50%;
  color: ${PRIMARY};
  font-size: 1.5em;
  z-index: 9999;
  cursor: pointer;
`

class BackToTop extends Component {

  state = { hidden: true }

  clickHandler = () => document.scrollingElement.scrollTop = 0

  scrollHandler = debounce(() => this.setState({
    hidden: document.scrollingElement.scrollTop === 0
  }), 300)

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }
  
  render() {
    return <BackToTopWrapper 
      hidden={this.state.hidden}
      onClick={this.clickHandler}
    >
      <span style={{lineHeight: '60px'}}>
        <UpIcon />
      </span>
    </BackToTopWrapper>  
  }
}

const History = observer(class History extends Component {

  state = {
    tags: state.searchTags
  }


  componentWillMount() {
    addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = debounce(() => {
    if (this.needLoadFiles()) {
      state.fetchFilesToSourceFilesAction()
    }
  }, 100)

  needLoadFiles = () => {
    let se = document.scrollingElement
    let curScrollBottom = se.scrollTop + se.clientHeight
    
    return curScrollBottom - this.galleryHeight > -600
  }

  render() {
    let tags = this.state.tags.map((text, key) => ({ text, key }))
    let suggestions = state.sourceTags.filter(tag => (
      !this.state.tags.includes(tag)
    ))
    let photos = state.sourceFiles
    let length = state.sourceFiles.length

    return <Div ref={wrapper => this.wrapper = ReactDOM.findDOMNode(wrapper)}>
      <SearchWrapper>
        <ChangeSource onClick={state.switchDataSourceAction}>{state.dataSourceIsPublic.get()? 'Public' : 'Privacy'}</ChangeSource>
        <div style={{width: '80%', display: 'inline-block'}}>
          <Tags 
            suggestions={suggestions}
            tags={tags}
            autocomplete
            placeholder="enter tag to filter photos"
            handleAddition={state.addSearchTag}
            handleDelete={state.deleteSearchTag}
          />
        </div>
      </SearchWrapper>
      <Measure whitelist={['width', 'height']} onMeasure={
        ({ height }) => this.galleryHeight = height
      }>
        {
          ({ width }) => (
            <Gallery 
              cols={
                width > 1800?  5 :
                width > 1468?  4 :
                width > 1024?  3 :
                width > 480?   2 : 1
              } 
              photos={photos}
              coverComponent={props => 
                <CoverComponent
                    data={Object.assign({}, props, { photoname: props.filename })}
                />
              }
            />
          )
        }
      </Measure>
      <BackToTop />
    </Div>
  }
})

export default History