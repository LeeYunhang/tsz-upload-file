import React from 'react'
import styled from 'styled-components'

import { PRIMARY, LIGHT_GRAY } from '../utils'

let Div = styled.div`
  height: 100%;
  padding: 32px 20%;
  color: ${PRIMARY};
  line-height: 1.5;
  
`

let H1 = styled.h1`
  display: inline-block;
`

let Em = styled.em`
  color: ${LIGHT_GRAY};
  margin-left: 16px;
`

let List = styled.ul`
  margin-top: 16px;
  margin-left: 16px;
  margin: 16px 0 0 16px;
  line-height: 2;
`

export default function() {
  return <Div>
    <H1>1.0.0</H1>
    <Em>2017.04.12</Em>
    <List>
      <li>初始版本</li>
    </List>
  </Div>
}