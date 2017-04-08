import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Measure from 'react-measure'
import { observer } from 'mobx-react'
import { WithContext as Tags } from 'react-tag-input'


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
  margin-right: 12px;
  color: ${PRIMARY};
  font-weight: 500;
  font-size: 1.2em;
  cursor: pointer;
  border-bottom: 1px #8590a6 solid;
`

const History = observer(class History extends Component {

  state = {
    tags: state.searchTags
  }

  handleAddition = tag => {
    let tags = this.state.tags

    if (!tags.includes(tag) && state.storedTags.includes) {
      tags.push(tag)
      
    }
    state.dumpSearchTags()
  }

  componentWillMount() {
    document.getElementById('root').addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    document.getElementById('root').removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.root = this.root || document.getElementById('root')
    if (this.galleryHeight - this.root.scrollTop < 500) {
      state.fetchFilesToSourceFilesAction()

    }
  }

  handleDelete = i => {
    this.state.tags.splice(i, 1)
    state.dumpSearchTags()
  }

  render() {
    let tags = this.state.tags.map((text, key) => ({ text, key }))
    let suggestions = state.sourceTags.filter(tag => (
      !this.state.tags.includes(tag)
    ))
    let photos = state.sourceFiles
      .filter(photo => (
        intersection(this.state.tags, photo.tags).length
          === this.state.tags.length
      ))

    return <Div ref={wrapper => this.wrapper = ReactDOM.findDOMNode(wrapper)}>
      <SearchWrapper>
        <ChangeSource onClick={state.switchDataSourceAction}>{state.dataSourceIsPublic.get()? 'Public' : 'Privacy'}</ChangeSource>
        <div style={{width: '80%', display: 'inline-block'}}>
          <Tags 
            suggestions={suggestions}
            tags={tags}
            autocomplete
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
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
                    {...Object.assign({}, props, { photoname: props.filename })}
                />
              }
            />
          )
        }
      </Measure>
    </Div>
  }
})

export default History