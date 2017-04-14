import React from 'react'
import styled from 'styled-components'

import { PRIMARY } from '../utils/color'

let Footer = styled.footer`
  background-color: lightgray;
  padding: 12px 20%;
`

let P = styled.p`
  font-size: 1.2em;
  light-height: 100%;
  color: ${PRIMARY};
`



export default function (props) {
  return <Footer>
    <P>Copyright © 2017. All rights reserved.</P>
  </Footer>
}