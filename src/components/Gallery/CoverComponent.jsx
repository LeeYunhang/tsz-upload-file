import React, { PropTypes } from 'react'
import styled from 'styled-components'

let Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  padding: 16px;
  background-color: rgba(255, 255, 255, .3)  
  bottom: 0;
  width: 100%;
  max-height: 100%;
  height: 40px;
  color: #FFF;
  overflow: hidden;  
  box-sizing: border-box;
`

let PhotoLink = styled.a`
  display: inline-block;
  padding: 4px;
  text-decoration: none;
  color: #FFF;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default function CoverComponent({ url, photoname, width, height }) {
  return <Bottom>
      <PhotoLink href={url}>{photoname}</PhotoLink>
      <span>{width}x{height}</span>
    </Bottom>
}

CoverComponent.propTypes = {
  url: PropTypes.string.isRequired,
  photoname: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}