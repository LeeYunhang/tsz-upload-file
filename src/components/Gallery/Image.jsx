import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

let Img = styled.img`
  width: 100%;
`

let ImageWrapper = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 100%;
  margin: ${props => props.margin}px;

  box-sizing: border-box;
  overflow: hidden;
  cursor: ${props => props.isPointer? 'pointer' : null}
`

let CoverComponentWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
`

export default class Image extends Component {

  state = { coverComponent: null }

  clickHandler = () => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(this.props)
    }
  }

  mouseEnterHandler = () => {
    if (typeof this.props.coverComponent === 'function') {
      this.setState({ coverComponent: this.props.coverComponent(this.props) })
    }
  }

  mouseLeaveHandler = () => {
    this.setState({ coverComponent: null })
  }

  render() {
    return <ImageWrapper 
      margin={this.props.margin}
      isPointer={this.props.isPointer}
      style={{borderRadius: this.props.radius + 'px'}}
    >
      <Img
        src={this.props.url} alt={this.props.alt}
        style={{ width: 100 + '%' }}
        margin={this.props.margin}
      />
      <CoverComponentWrapper
        onClick={this.clickHandler} 
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        {this.state.coverComponent}
      </CoverComponentWrapper>
  </ImageWrapper>
  }

}