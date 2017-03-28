import React from 'react'
import styled from 'styled-components'

import { PRIMARY } from '../utils'

let Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

let H2 = styled.h2`
  display: inline-block;
  color: ${PRIMARY};
  align-self: center;
`

let Link = styled.a`
  color: ${PRIMARY};
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