import styled from 'styled-components'
import React, { Component } from 'react'

let Div = styled.div`
  margin: 0;
  padding: 0;
`
export default function(props) {
  return <Div>
    {props.children}
  </Div>
}