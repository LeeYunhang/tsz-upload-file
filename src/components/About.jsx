import React from 'react'
import styled from 'styled-components'

import { normalColor } from '../color.js'

let Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

let H2 = styled.h2`
  display: inline-block;
  ${normalColor}
  align-self: center;
`

let Link = styled.a`
  ${normalColor}
  align-self: center;
  font-size: 1.2em; 
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export default function({}) {
  return <Div>
      <H2>Write by </H2><Link href="https://mrcodex.com">mrcode</Link>
  </Div>
}