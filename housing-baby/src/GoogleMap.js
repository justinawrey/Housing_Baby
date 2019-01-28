import React, { Component } from 'react'
import CreatableSelect from 'react-select/lib/Creatable'
import './GoogleMap.css'

const formEmbeddedMap = (origin, destination, transportationMode) => {
  const path = 'https://www.google.com/maps/embed/v1/directions'
  const encodedOrigin = encodeURIComponent(origin)
  const encodedDestination = encodeURIComponent(destination)
  const encodedTransportationMode = encodeURIComponent(transportationMode)
  const apiKey = process.env.REACT_APP_MAPS_API_KEY

  return `${path}?origin=${encodedOrigin}&destination=${encodedDestination}&mode=${encodedTransportationMode}&key=${apiKey}`
}

const getDestinationsFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('destinations')) || []

const addDestinationsToLocalStorage = destinations =>
  localStorage.setItem('destinations', JSON.stringify(destinations))

export default class GoogleMap extends Component {
  constructor(props) {
    super(props)
    const destinations = getDestinationsFromLocalStorage()
    const selectedDestination = destinations && destinations[0]

    this.state = {
      transportationMode: 'driving',
      destinations,
      selectedDestination,
    }
  }

  render() {
    const { height, width, origin } = this.props
    const { transportationMode, selectedDestination, destinations } = this.state

    return (
      <>
        <div id='top-panel' style={{ width: Number(width) }}>
          <div className='top-panel-child'>
            <b>From:</b> {origin}
            <br />
            <br />
            <b>To:</b>
            <CreatableSelect
              isClearable
              onChange={selectedDestination => {
                if (selectedDestination) {
                  this.setState({
                    selectedDestination,
                  })
                }
              }}
              onCreateOption={created => {
                const newDestination = { value: created, label: created }
                const newDestinations = [...destinations, newDestination]
                addDestinationsToLocalStorage(newDestinations)
                this.setState({
                  destinations: newDestinations,
                  selectedDestination: newDestination,
                })
              }}
              options={destinations}
              value={selectedDestination}
              placeholder='Select a destination or create new...'
            />
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
        {selectedDestination && (
          <iframe
            title='map'
            height={String(height)}
            width={String(width)}
            frameBorder='0'
            style={{ border: 0 }}
            src={formEmbeddedMap(
              origin,
              selectedDestination.value,
              transportationMode
            )}
            allowFullScreen
          />
        )}
      </>
    )
  }
}
