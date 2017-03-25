import React from 'react'
import styled from 'styled-components'

import { PRIMARY } from '../color.js'

let Footer = styled.footer`
  display: flex;
  height: 60px;
  background-color: lightgray;
  padding: 0 20%;
`

let P = styled.p`
  font-size: 1.2em;
  align-self: center;
  color: ${PRIMARY};
`



export default function (props) {
  return <Footer>
    <P>Copyright © 2017. All rights reserved.</P>
  </Footer>
}