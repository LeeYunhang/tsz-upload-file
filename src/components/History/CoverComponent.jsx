import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import _CloseIcon from 'react-icons/lib/md/close'
import _CopyIcon from 'react-icons/lib/md/content-copy'
import _SyncIcon from 'react-icons/lib/md/sync'
import { WithContext as Tags } from 'react-tag-input'
import { observer } from 'mobx-react'
import ReactTooltip from 'react-tooltip'

import state from '../../stores'
import { PRIMARY } from '../../utils'
import { clearSuffix } from '../../utils'
import { rotate } from '../key-frames.js'

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

let SyncIcon = styled(_SyncIcon)`
  position: absolute;
  right: 48px;
  top: 16px;
  font-size: 1.4em;
  color: ${PRIMARY};
  cursor: pointer;

  ${({ syncing }) => syncing? `animation: 1s ${rotate} linear infinite` : ''}
`

let CloseIcon = styled(_CloseIcon)`
  position: absolute;
  right: 16px;
  top: 16px;
  font-size: 1.4em;
  color: ${PRIMARY};
  cursor: pointer;
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


function UrlItem({ urlType, content, timestamp }) {
  let id = urlType + timestamp
  return <UrlItemWrapper>
      <H5>{urlType}</H5>
      <Input id={id} type="text" value={content} readOnly />
      <CopyIcon 
        onClick={() => {
          document.getElementById(id).select()
          document.execCommand('copy')
        }}
        data-tip
        data-for={"tip" + timestamp}
      />
  </UrlItemWrapper>
}

function UrlList({ url, timestamp, onCopy }) {
  let markdown = `![](${url})`
  let html = `<img src="${url}" alt="" title="" />`

  return <UrlListWrapper>
    <ReactTooltip id={"tip" + timestamp}>
      Copy
    </ReactTooltip>
    <UrlItem urlType="URL" content={url} timestamp={timestamp} />
    <UrlItem urlType="Markdown" content={markdown} timestamp={timestamp} />
    <UrlItem urlType="HTML" content={html} timestamp={timestamp} />
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

  state = { isSync: false }

  deletePhotoHandler = () => {
    state.deleteSourceFileAction(this.props.data.url)
  }

  copyUrlHandler = event => {
    event.nativeEvent.target.previousSibling.select()
    document.execCommand('copy')
  }

  handleAddition = tag => {
    let tags = this.props.data.tags
  
    if (!tags.includes(tag)) {
      tags.push(tag)
      state.updateSourceFileAction(this.props.data.url, { tags })
    }
  }

  handleDelete = i => {
    this.props.data.tags.splice(i, 1)
    state.updateSourceFileAction(this.props.data.url, {
      tags: this.props.data.tags.filter((v, index) => index !== i)
    })
  }

  syncPhoto = async () => {
    await state.syncFileAction(this.props.data)
    this.setState({ isSync: true })
  }

  render() {
    let { photoname, width, height, url, timestamp, tags = [], isSync } = this.props.data
    let suggestions = state.storedTags.filter(tag => !tags.includes(tag))
    let a = state.storedFiles
    let syncing = state.syncingFiles.some(file => file.url === url)

    photoname = clearSuffix(photoname)
    tags = tags.map((tag, key) => ({ key, 'text': tag }))
    return <Div>
      <ReactTooltip id={"tip-sync" + timestamp}>
        Sync
      </ReactTooltip>
      <ReactTooltip id={"tip-delete" + timestamp}>
        Delete
      </ReactTooltip>
      <PhotoNameWrapper>
        <PhotoName target="_blank" rel="noopener" href={url}>{photoname}</PhotoName>
      </PhotoNameWrapper>
      {!this.state.isSync && !isSync && !state.dataSourceIsPublic.get() && <SyncIcon       syncing={syncing} 
        onClick={this.syncPhoto} 
        data-for={"tip-sync" + timestamp}
        data-tip
      />}
      {!state.dataSourceIsPublic.get() && <CloseIcon  
        onClick={this.deletePhotoHandler}
        data-for={"tip-delete" + timestamp}
        data-tip
      />}
      <Tags
        placeholder="add tag for this photo"
        suggestions={suggestions}
        tags={tags}
        readOnly={state.dataSourceIsPublic.get()}
        handleAddition={this.handleAddition}
        handleDelete={this.handleDelete}
      />
      <UrlList url={url} timestamp={timestamp} />
    </Div>
  }
})