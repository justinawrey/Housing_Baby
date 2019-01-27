import React from 'react'

const formEmbeddedMap = (origin, destination, transportationMode) => {
  const path = 'https://www.google.com/maps/embed/v1/directions'
  const encodedOrigin = encodeURIComponent(origin)
  const encodedDestination = encodeURIComponent(destination)
  const encodedTransportationMode = encodeURIComponent(transportationMode)
  const apiKey = process.env.REACT_APP_MAPS_API_KEY

  return `${path}?origin=${encodedOrigin}&destination=${encodedDestination}&mode=${encodedTransportationMode}&key=${apiKey}`
}

export default ({ origin, destination, transportationMode, height, width }) => (
  <iframe
    title='map'
    height={String(height)}
    width={String(width)}
    frameborder='0'
    style={{ border: 0 }}
    src={formEmbeddedMap(origin, destination, transportationMode)}
    allowfullscreen
  />
)
