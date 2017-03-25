import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import _CloseIcon from 'react-icons/lib/md/close'
import _CopyIcon from 'react-icons/lib/md/content-copy'
import _EditIcon from 'react-icons/lib/md/edit'
import { WithContext as Tags } from 'react-tag-input'
import { observer } from 'mobx-react'

import state from '../../stores'
import { PRIMARY } from '../../color.js'
import './index.css'

let Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .3);
  box-sizing: border-box;
`

let CloseIcon = styled(_CloseIcon)`
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 1.4em;
  color: ${PRIMARY};
  cursor: pointer;
`

let EditIcon = styled(_EditIcon)`
  cursor: pointer;
  font-size: 1.4em;
  color: ${PRIMARY};
  margin-left: 16px;
`

let PhotoName = styled.a`
  max-width: 60%;
  color: ${PRIMARY};
  text-decoration: none;
`

let PhotoNameInput = styled.input`
  max-width: 60%;
  color: ${PRIMARY};
`

let PhotoNameWrapper = styled.div`
  position: absolute;
  max-width: 75%;
  top: 16px;
  left: 16px;
  overflow: hidden;
`

let UrlItemWrapper = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  color: ${PRIMARY};
`

let H5 = styled.h5`
  color: ${PRIMARY};
  width: 80px;
`

let Input = styled.input`
  background: none;
  border: 0;
  outline: none;
  color: ${PRIMARY};
`

let CopyIcon = styled(_CopyIcon)`
  color: ${PRIMARY};
  cursor: pointer;
`

let UrlListWrapper = styled.div`
  width: 100%;
  align-self: center;
  background-color: rgba(255, 255, 255, .7);
  padding: 0 16px;
  box-sizing: border-box;
`

function UrlItem({ urlType, content, timestamp, onCopy }) {
  return <UrlItemWrapper>
      <H5>{urlType}</H5>
      <Input id={urlType + timestamp} type="text" value={content} readOnly />
      <CopyIcon onClick={onCopy} />
  </UrlItemWrapper>
}

function UrlList({ url, timestamp, onCopy }) {
  let markdown = `![](${url})`
  let html = `<img src="${url}" alt="" title="" />`

  return <UrlListWrapper>
    <UrlItem urlType="URL" content={url} timestamp={timestamp} onCopy={onCopy} />
    <UrlItem urlType="Markdown" content={markdown} timestamp={timestamp} onCopy={onCopy} />
    <UrlItem urlType="HTML" content={html} timestamp={timestamp} onCopy={onCopy} />
  </UrlListWrapper>
}

export default observer(class CoverComponent extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    photoname: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
  }

  deletePhotoHandler = () => state.deleteFiles([this.props.url])

  copyUrlHandler = event => {
    event.nativeEvent.target.previousSibling.select()
    document.execCommand('copy')
  }

  handleAddition = tag => {
    let tags = this.props.tags

    tags.push(tag)
    state.updateFile(this.props.url, { tags })
  }

  render() {
    let { photoname, width, height, url, timestamp, tags = [] } = this.props
    console.log(this.props)
    let tmp = photoname.split('.')

    tmp.pop()
    photoname = tmp.join('.')
    tags = tags.map((tag, key) => ({ key, 'text': tag }))
    return <Div>
      <PhotoNameWrapper>
        <PhotoName target="_blank" rel="noopener" href={url}>{photoname}</PhotoName>
        <EditIcon />
      </PhotoNameWrapper>
      <CloseIcon onClick={this.deletePhotoHandler} />
      <Tags
        suggestions={[]}
        tags={tags}
        handleAddition={this.handleAddition}
      />
      <UrlList onCopy={this.copyUrlHandler} url={url} timestamp={timestamp} />
    </Div>
  }
})