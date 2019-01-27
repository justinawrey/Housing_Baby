import React, { Component } from 'react'

const formEmbeddedMap = (origin, destination, transportationMode) => {
  const path = 'https://www.google.com/maps/embed/v1/directions'
  const encodedOrigin = encodeURIComponent(origin)
  const encodedDestination = encodeURIComponent(destination)
  const encodedTransportationMode = encodeURIComponent(transportationMode)
  const apiKey = process.env.REACT_APP_MAPS_API_KEY

  return `${path}?origin=${encodedOrigin}&destination=${encodedDestination}&mode=${encodedTransportationMode}&key=${apiKey}`
}

export default class GoogleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transportationMode: 'driving',
    }
  }

  render() {
    const { height, width, origin, destination } = this.props
    const { transportationMode } = this.state

    return (
      <>
        <div>
          {['driving', 'bicycling', 'walking', 'transit'].map(item => (
            <span>
              <input
                type='radio'
                name='transportationMode'
                value={item}
                onClick={() => this.setState({ transportationMode: item })}
                checked={this.state.transportationMode == item}
              />
              {item}
            </span>
          ))}
        </div>
        <iframe
          title='map'
          height={String(height)}
          width={String(width)}
          frameborder='0'
          style={{ border: 0 }}
          src={formEmbeddedMap(origin, destination, transportationMode)}
          allowfullscreen
        />
      </>
    )
  }
}

/*

  example use -

  <GoogleMap
    origin='4644 West 15th Avenue, Vancouver BC'
    destination='Sun Sushi, Vancouver, BC'
    height='450'
    width='600'
  />

*/
