import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import Nav from './Nav/Nav'
import Footer from './Footer'
import Body from './Body'

let Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

class App extends Component {
  render() {
    return (
      <Router>
        <Div className="app">
          <Nav />
          <Body />
          <Footer />
        </Div>
      </Router>
    );
  }
}

export default App
