import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'

import Image from './Image'
export { default as CoverComponent } from './CoverComponent'

let Div = styled.div`
  column-count: ${props => props.cols};
  column-gap: 0;
`

export class Gallery extends Component {
  static displayName = 'Gallery'
  static propTypes = {
    isPointer: PropTypes.bool,
    cols: PropTypes.number,
    margin: PropTypes.number,
    radius: PropTypes.number,
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    photos: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      alt: PropTypes.string,
    })).isRequired
  }

  static defaultProps = {
    cols: 3,
    margin: 4,
    radius: 0,
    isPointer: false
  }

  render() {
    let rows = []
    let { cols, margin, onClick, coverComponent, photos, radius, isPointer } = this.props
    let copyPhotos = photos.slice()

    while(copyPhotos.length >= cols) {
      rows.push(copyPhotos.splice(0, cols))
    }
    rows.push(copyPhotos.slice())

    let allImages = rows.map(row => {
      return row.map(photo => {
        let widthPercent = Math.floor(1/cols * 100)

        return <Image {...photo} key={photo.url} 
          {...{margin, onClick, coverComponent, radius, isPointer}}
        />
      })
    })

    allImages.reduce((pre, cur) => [...(pre? pre : []), ...cur], null)

    return <Div {...{cols}}>
      {allImages}
    </Div>
  }


}