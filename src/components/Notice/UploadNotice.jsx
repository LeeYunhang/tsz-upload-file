import React, { Component } from 'react'
import styled from 'styled-components'
import _CloseIcon from 'react-icons/lib/md/close'

import HOCNotice from './HOCNotice'
import { PRIMARY } from '../utils/color.js'

class UploadNotice extends Component {
  render() {
    const { state } = this.props

    return <div>
      
    </div>
  }
}

export default HOCNotice(UploadNotice)