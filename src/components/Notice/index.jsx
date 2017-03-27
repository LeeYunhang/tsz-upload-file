import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import CloseIcon from 'react-icons/lib/md/close'


import { WARNING, ERROR, SUCCESS, INFO } from '../../utils'
import state from '../../stores'

let Div = styled.div`
  display: ${({ show }) => show? 'flex' : 'none'};
  align-items: center;
  position: fixed;
  justify-content: space-between;
  min-width: 250px;
  color: ${getColorFromStatus};
  border-color: ${getColorFromStatus};
  border: 1px solid;
  border-radius: 4px;
  min-height: 50px;
  background-color: white;
  padding: 0 1em 0 2em;
  bottom: 120px;
  z-index: 100;
  left: 40%;
  right: 40%;
  box-shadow: 0 1px 12px 3px rgba(0,34,77,.05);
`

function getColorFromStatus({ status }) {
  return (
    status === INFO?      '#BBDEFB' :
    status === WARNING?   '#FF8A65' :
    status === SUCCESS?   '#66BB6A' :
    status === ERROR?     '#F44336' :
    'none'
  )
}

function addStyleForElement(element, style) {
  return React.cloneElement(element, { style })
}

const Notice = observer(class Notice extends Component {

  static propTypes = {
    show: PropTypes.bool,
    icon: PropTypes.element
  }

  static defaultProps = {
    show: false,
    status: INFO,
    icon: <CloseIcon />
  }

  render() {
    let propsToDiv = {
      show: true,
      status: this.props.status
    }
    let { uploadedFilesCount, remainFilesCount } = state
    let icon = this.props.icon
    
    icon = addStyleForElement(icon, { 
      cursor: 'pointer',
      fontSize: '1.2em'
    })
    return <Div id="haha"  {...propsToDiv}>
      <p>
        uploaded: {state.uploadedFilesCount.get() || 0} 
        remain: {state.remainFilesCount.get() || 0}
      </p>
      {icon}
    </Div>
  }
})

export default Notice

