import React, { Component } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Nav from './Nav/Nav'
import Footer from './Footer'
import History from './History'
import Home from './Home'
import About from './About'
import Log from './Log'


let Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: inherit;
`

class App extends Component {
  render() {
    return (
      <Router>
        <Div className="app">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/history" component={History} />
          <Route path="/about" component={About} />
          <Route path="/log" component={Log} />
          <Footer />
        </Div>
      </Router>
    );
  }
}

export default App
