import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import _UploadIcon from 'react-icons/lib/md/file-upload'

import { normalColor, normal } from '../color.js'

let Div = styled.div`
  margin: 2em 0;
`

let H1 = styled.h1`
  font-size: 2em;
  padding: .4em 0;
  border-bottom: lightgray 1px solid; 
  ${normalColor}
  
  &::after {
    padding-left: 2em;
    font-size: .5em;
    content: '5 MB max per file. 10 files max per request.';
  }
`

let UploadImageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: dashed ${normal} 2px;
  border-radius: 4px;
`

let Main = styled.main`
  padding: 0 20%;
  flex-basis: 100%;
  height: 170px;
`

let P = styled.p`
  ${normalColor}
  margin: 0 0 2em;
  font-size: 1.5em;
`

let UploadIcon = styled(_UploadIcon)`
  width: 4em;
  height: 4em;
  margin: 5em 0 .5em;
  ${normalColor}
`

class Home extends Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  dragOverHandler = event => {
    event.preventDefault()
    event.stopPropagation();
    return false;
  }

  dragEnterHandler = () => {
    ReactDOM.findDOMNode(this.uploadImage).style.backgroundColor = 'whitesmoke'
  }
  

  dragLeaveHandler = () => {
    ReactDOM.findDOMNode(this.uploadImage).style.backgroundColor = ''
  }

  dropHandler = async (event) => {
    event.preventDefault()
    
    let files = event.dataTransfer.files
    console.dir(files)

    let response = await fetch('https://sm.ms/api/upload', {
      smfile: files
    })

    console.dir(response)
    this.dragLeaveHandler()
  }

  render() {
    return <Main>
      <Div>
        <H1>Image Upload</H1>
      </Div>
      <Div>
        <UploadImageArea 
          onDragEnter={this.dragEnterHandler}
          onDragLeave={this.dragLeaveHandler}
          onDragOver={this.dragOverHandler}
          onDrop={this.dropHandler}
          ref={uploadImage => this.uploadImage = uploadImage}
          >
          <UploadIcon />
          <P>Drag and drop here</P>
        </UploadImageArea>
      </Div>
    </Main>
  }
}

export default Home