import React, { Component } from 'react'
import './GoogleMap.css'

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
      selectedDestination: props.destinations[0],
    }
  }

  render() {
    const { height, width, origin, destinations } = this.props
    const { transportationMode, selectedDestination } = this.state

    return (
      <>
        <div id='top-panel' style={{ width: Number(width) }}>
          <div className='top-panel-child'>
            <b>From:</b> {origin}
            <br />
            <br />
            <b>To:</b>
            <select
              onChange={event =>
                this.setState({ selectedDestination: event.target.value })
              }
            >
              {destinations.map(item => (
                <option key={item}> {item} </option>
              ))}
            </select>
          </div>
          <div className='top-panel-child'>
            {['driving', 'bicycling', 'walking', 'transit'].map(item => (
              <div key={item}>
                <input
                  type='radio'
                  name='transportationMode'
                  value={item}
                  onChange={() => this.setState({ transportationMode: item })}
                  checked={this.state.transportationMode === item}
                />
                {item}
                <br />
              </div>
            ))}
          </div>
        </div>
        <iframe
          title='map'
          height={String(height)}
          width={String(width)}
          frameBorder='0'
          style={{ border: 0 }}
          src={formEmbeddedMap(origin, selectedDestination, transportationMode)}
          allowFullScreen
        />
      </>
    )
  }
}

/*

  example use -

  <GoogleMap
    origin='4644 West 15th Avenue, Vancouver BC'
    destinations={['Sun Sushi, Vancouver, BC', 'Burnaby, BC', 'Chilliwack, BC']}
    height='450'
    width='600'
  />

*/
