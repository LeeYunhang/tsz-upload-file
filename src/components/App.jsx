import React, { Component } from 'react'
import styled from 'styled-components'

import Nav from './Nav'
import Div from './Div'

class App extends Component {
  render() {
    return (
      <Div className="app">
        <Nav />
      </Div>
    );
  }
}

export default App;
