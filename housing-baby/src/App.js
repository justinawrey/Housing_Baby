/*global chrome*/

import React, { Component } from 'react'
import logo from './logo.svg'
import GoogleMap from './GoogleMap'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.updateAddress = this.updateAddress.bind(this)
    this.state = {
      adAddress: null,
    }
  }

  updateAddress(address) {
    this.setState({
      adAddress: address,
    })
  }

  componentDidMount() {
    const that = this
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'GET_ADDRESS' },
        response => {
          console.log(response.address)
          if (response.address) {
            that.setState({ adAddress: response.address })
          } else {
            console.log('ADDRESS NOT AVAILABLE')
          }
        }
      )
    })
  }

  render() {
    if (this.state.adAddress) {
      return (
        <GoogleMap
          origin='4644 West 15th Avenue, Vancouver BC'
          destination={this.state.adAddress}
          height='450'
          width='600'
        />
      )
    } else {
      return (
        <div>
          <h1>ADDRESS UNAVAILABLE</h1>
        </div>
      )
    }
  }
}

export default App
