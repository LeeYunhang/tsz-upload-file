import React, { Component } from 'react'
import styled from 'styled-components'

import { normalColor } from '../../color.js'
let Header = styled.header`
  background-color: #fff;
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
  padding: 0 20%;
  ${normalColor}
`

let Brand = styled.h1`
  display: inline-block;
  vertical-align: sub;
  margin-right: 2em;
  transform: rotate(10deg);
`

let List = styled.ul`
  display: inline-flex;
  height: 100%;

  > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 12px;

    &:first-child {
      padding-left: 0
    }

    &:last-child {
      padding-right: 0
    }
    > a {
      text-decoration: none;
      vertical-align: center;
      align-self: center;
      cursor: pointer;
      font-size: 1.2em;
      ${normalColor}
    }
  }
`

class Nav extends Component {
  render() {
    return <Header>
      <Brand>TSZ</Brand>
      <List>
        <li><a href="void(0)">Home</a></li>
        <li><a href="void(0)">History</a></li>
        <li><a href="void(0)">About</a></li>
      </List>
    </Header>
  }
}

export default Nav

