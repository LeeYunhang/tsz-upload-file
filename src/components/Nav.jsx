import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

let Header = styled.header`
  background-color: #fff;
  width: 100%;
  height: 60px;
  box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
  padding: 0 20%;
`

let List = styled.ul`
  height: 100%;
  display: flex;

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
      color: #8590a6;
    }
  }
`

class Nav extends Component {
  render() {
    return <Header>
      <List>
        <li><a href="void(0)">Home</a></li>
        <li><a href="void(0)">Home</a></li>
        <li><a href="void(0)">Home</a></li>
        <li><a href="void(0)">Home</a></li>
        <li><a href="void(0)">Home</a></li>
      </List>
    </Header>
  }
}

export default Nav

