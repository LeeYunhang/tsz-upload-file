import React, {  PureComponent } from 'react'
import styled from 'styled-components'
import _ArrowDropDown from 'react-icons/lib/md/arrow-drop-down'
import _UrlCopy from 'react-icons/lib/md/content-copy'

import { PRIMARY } from '../../color.js'

let colorAndVertialAlign = `color: ${PRIMARY}; align-self: center;`
let iconStyles = `${colorAndVertialAlign} font-size: 2em; cursor: pointer;`

let Div = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
  background-color: white
  min-height: 60px;
  transition: all .3s ease-out;
  width: 100%;
  box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);

  &:hover {
    box-shadow: 0 3px 6px 0 rgba(0,34,77,.05);
  }
`

let H3 = styled.h3`
  ${colorAndVertialAlign}
  cursor: pointer;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 2em;
  box-sizing: content;
`

let ArrowDropDown = styled(_ArrowDropDown)`
  ${iconStyles}
  transition: all .3s ease-out;
`

let UrlCopyIcon = styled(_UrlCopy)`
  ${iconStyles}
  margin-right: 1em;
  font-size: 1.5em;

`

let Url = styled.input`
  ${colorAndVertialAlign}
  margin-left: 2em;
  background-color: none;
  border: 0;
  outline: none;
  min-width: 350px;
`

let List = styled.ul`
  width: 100%;
  list-style-type: none;
`

let Item = styled.li`
  display: flex;
  &:first-child {
    border-top: 1px solid ${PRIMARY};
  }
  border-bottom: 1px solid ${PRIMARY};
  &:last-child {
    border-bottom: 0
  }
  height: 60px;
`

let FillDiv = styled.div`
  align-self: center;
  flex-grow: 1000;
  flex-basis: 10px;
`

function UrlCopyView({ url, copyFn }) {
  return <UrlCopyIcon onClick={copyFn} />
}

class ImageUrlView extends PureComponent {

  state = { isExpended: false }

  static defaultProps = { url: 'https://mrcodex.com', filename: 'unnamed', timestamp: 0 }

  clickHandler = () => this.setState({ isExpended: !this.state.isExpended })

  render() {
    let { url, filename, timestamp } = this.props
    let markdown = `![](${url})`
    let html = `<img src="${url}" alt="" title="" />`

    return <Div style={{borderRadius: '4px'}}>
      <Div>
        <ArrowDropDown 
          onClick={this.clickHandler}
          className={this.state.isExpended? 'expended' : null}
        />
        <H3 onClick={this.clickHandler}>{filename}</H3>
        <Url id={"url" + timestamp} src={url} value={url} readOnly />
        <FillDiv></FillDiv>
        <UrlCopyView copyFn={() => {
          document.querySelector("#url" + timestamp).select()
          document.execCommand('copy')  
        }} url={url} />
      </Div>
      <List style={{ display: this.state.isExpended? undefined : 'none' }}>
        <Item key={"markdown" + timestamp}>
          <ArrowDropDown style={{ visibility: 'hidden' }}/>
          <H3>Markdown</H3>
          <Url id={"markdown" + timestamp} value={markdown} readOnly />
          <FillDiv></FillDiv>
          <UrlCopyView copyFn={() => {
            document.querySelector("#markdown" + timestamp).select()
            document.execCommand('copy')
          }} url={markdown}/>
        </Item>
        <Item key={"html" + timestamp}>
          <ArrowDropDown style={{ visibility: 'hidden' }}/>
          <H3>HTML</H3>
          <Url id={"html" + timestamp} value={html} readOnly />
          <FillDiv></FillDiv>
          <UrlCopyView copyFn={() => {
            document.querySelector("#html" + timestamp).select()
          document.execCommand('copy')
          }} url={html} />
        </Item>
      </List>
    </Div>
  }
}


export default ImageUrlView