import React, { Component } from 'react'
import styled from 'styled-components'
import Measure from 'react-measure'
import { observer } from 'mobx-react'


import { PRIMARY } from '../../color.js'
import state from '../../stores'
import { Gallery } from '../Gallery'
import CoverComponent from './CoverComponent'

let Div = styled.div`
  flex-basis: 100%;
  padding: 32px;
`

let H1 = styled.h1`
  color: ${PRIMARY};
  align-self: center;
`

const History = observer(class History extends Component {
  render() {
    console.log('LENGTH:' + state.storedFiles.length)
    return <Div>
      <Measure whitelist={['width']}>
        {
          ({ width }) => (
            <Gallery 
              cols={
                width > 1800? 5 :
                width > 1468? 4 :
                width > 1024?  3 :
                width > 480?  2 : 1
              } 
              photos={state.storedFiles}
              coverComponent={props => 
              <CoverComponent
                  {...Object.assign({}, props, { photoname: props.filename })}
              />}
            />
          )
        }
      </Measure>
    </Div>
  }
})

export default History