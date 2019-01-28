import React, { Component } from 'react'
import GoogleMap from './GoogleMap'
import './App.css'

class App extends Component {
  // constructor() {
  //   super()
  //   this.updateAddress = this.updateAddress.bind(this)
  //   this.state = {
  //     adAddress: null,
  //   }
  // }

  // updateAddress(address) {
  //   this.setState({
  //     adAddress: address,
  //   })
  // }

  // componentDidMount() {
  //   const that = this
  //   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  //     chrome.tabs.sendMessage(
  //       tabs[0].id,
  //       { action: 'GET_ADDRESS' },
  //       response => {
  //         console.log(response.address)
  //         if (response.address) {
  //           that.setState({ adAddress: response.address })
  //         } else {
  //           console.log('ADDRESS NOT AVAILABLE')
  //         }
  //       }
  //     )
  //   })
  // }

  render() {
    // if (this.state.adAddress) {
    return (
      <GoogleMap
        // origin={this.state.adAddress}
        origin='4644 West 15th Avenue'
        height='450'
        width='600'
      />
    )
    // } else {
    //   return (
    //     <div>
    //       <h1>Could not find housing address on current page</h1>
    //     </div>
    //   )
    // }
  }
}

export default App
