import React, { Component } from 'react'
import styled from 'styled-components'
import Measure from 'react-measure'
import { observer } from 'mobx-react'
import { WithContext as Tags } from 'react-tag-input'


import { PRIMARY } from '../../utils/color.js'
import state from '../../stores'
import { Gallery } from '../Gallery'
import CoverComponent from './CoverComponent'
import { intersection } from '../../utils'

let Div = styled.div`
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
  border-bottom: solid 1px ${PRIMARY};
  z-index: 1000;
`

const History = observer(class History extends Component {

  state = {
    tags: state.searchTags
  }

  handleAddition = tag => {
    let tags = this.state.tags

    if (!tags.includes(tag) && state.allTags.includes) {
      tags.push(tag)
      
    }
    state.dumpSearchTags()
  }

  handleDelete = i => {
    this.state.tags.splice(i, 1)
    state.dumpSearchTags()
  }

  render() {
    let tags = this.state.tags.map((text, key) => ({ text, key }))
    let suggestions = state.allTags.filter(tag => (
      !this.state.tags.includes(tag)
    ))
    let photos = state.storedFiles
      .filter(photo => (
        intersection(this.state.tags, photo.tags).length
          === this.state.tags.length
      ))

    return <Div>
      <SearchWrapper>
        <Tags 
          suggestions={suggestions}
          tags={tags}
          autocomplete
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
        />
      </SearchWrapper>
      <Measure whitelist={['width']}>
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