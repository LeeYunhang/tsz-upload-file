import React from 'react'
import styled from 'styled-components'

import { normalColor } from '../../color.js'
let Div = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

let H1 = styled.h1`
  ${normalColor}
  align-self: center;
`

export default function() {
  return <Div>
    <H1>还在写。 写好了开放出来。。 </H1>
  </Div>
}