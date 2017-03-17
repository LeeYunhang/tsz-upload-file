import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import styled from 'styled-components'
import { observer } from 'mobx-react'


import Home from './Home/Home'
import HistoryComponent from './History'
// import state from '../stores'

const Body = observer(class Body extends Component {
  render() {
      return <div style={{height: '100%', overflow: 'auto'}}>
        <Route exact path="/" component={Home}/>
        <Route path="/history" component={HistoryComponent}/>
      </div>
  }
})

export default Body