import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import _CloseIcon from 'react-icons/lib/md/close'


import { normalColor } from '../color.js'

let CloseIcon = styled(_CloseIcon)`
  ${normalColor}
  font-size: 1.5em;
  align-self: center;
  cursor: pointer;
`

function CloseIconView({ closeFn }) {
  return <CloseIcon  onClick={closeFn} />
}

let Div = styled.div`
  display:  ${props => props.isUploading? 'flex' : 'none'};
  justify-content: space-between;
  position: fixed;
  min-width: 250px;
  border-radius: 4px; 
  min-height: 50px;
  background-color: white;
  padding: 0 1em 0 2em;
  bottom: 120px;
  z-index: 100;
  left: 35%;
  right: 45%;
  box-shadow: 0 1px 12px 3px rgba(0,34,77,.05)
`

let P = styled.p`
  align-self: center;
  ${normalColor}
`


const Notice = observer(function ({ 
  error, remainFilesCount, 
  uploadedFilesCount, isUploading  
}) {
  let stopUploading = () => error.set(true)

  return <Div isUploading={isUploading.get()}>
    <P>uploaded: {uploadedFilesCount.get()} remain:{remainFilesCount.get()}</P>
    <CloseIconView closeFn={stopUploading} />
  </Div>
})

export default Notice