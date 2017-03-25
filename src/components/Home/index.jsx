import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import _UploadIcon from 'react-icons/lib/md/file-upload'
import { observer } from 'mobx-react'

import { PRIMARY } from '../../utils/color.js'
import state from '../../stores'
import ImageUrlView from './ImageUrlView'
import Notice from '../Notice'
import './index.css'

let Div = styled.div`
  margin: 2em 0;
`

let List = styled.ul`
  width: 100%;
  list-style-type: none;
`

let H1 = styled.h1`
  font-size: 2em;
  padding: .4em 0;
  border-bottom: lightgray 1px solid; 
  color: ${PRIMARY};
  
  &::after {
    padding-left: 2em;
    font-size: .5em;
    content: '5 MB max per file.';
  }
`

let UploadImageArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: dashed ${PRIMARY} 2px;
  border-radius: 4px;
`

let Main = styled.main`
  padding: 0 20%;
  flex-basis: 100%;
`

let P = styled.p`
  color: ${PRIMARY};
  margin: 0 0 2em;
  font-size: 1.5em;
`

let UploadIcon = styled(_UploadIcon)`
  width: 4em;
  height: 4em;
  margin: 5em 0 .5em;
  color: ${PRIMARY};
`

const UrlList = observer(function ({ uploadedFiles }) {
  return <List>
    {uploadedFiles.map((result, index) => (
      <li 
        key={result.timestamp + result.url} 
        style={{ margin: '1em 0' }}
      >
        <ImageUrlView {...result} />
      </li>
    ))}
  </List>
})

const Home = observer(class Home extends Component {

  state = { urlViews: null, selectedFiles: false }
  filesInput = document.createElement('input')

  componentDidMount() {
    this.filesInput.setAttribute('type', 'file')
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
 
    this.dragLeaveHandler()
    if (event.dataTransfer.files.length && files[0].type.indexOf('image') !== -1) {
      await state.uploadFiles(files)
    }
  }

  clicHandler = async () => {
    if (!this.state.selectedFiles) {
      this.filesInput.click()
      this.setState({ selectedFiles: true })
    } else {
      await state.uploadFiles(this.filesInput.files)
      this.setState({ selectedFiles: false })
    }
  }

  render() {
    return <Main>
      <Div>
        <H1>Image Upload</H1>
      </Div>
      <Div>
        <UploadImageArea
          onClick={this.clicHandler} 
          onDragEnter={this.dragEnterHandler}
          onDragLeave={this.dragLeaveHandler}
          onDragOver={this.dragOverHandler}
          onDrop={this.dropHandler}
          ref={uploadImage => this.uploadImage = uploadImage}
          >
          <UploadIcon />
          <P>{this.state.selectedFiles? 'Click to upload images' : 'Drag and drop here'}</P>
        </UploadImageArea>
        <UrlList uploadedFiles={state.uploadedFiles}/>
        <Notice {...state}/>
      </Div>
    </Main>
  }
})

export default Home