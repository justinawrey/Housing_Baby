/*global chrome*/

import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentDidMount() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'GET_ADDRESS' },
        response => {
          if (response.address) {
            console.log(response.address)
          } else {
            console.log('ADDRESS NOT AVAILABLE')
          }
        }
      )
    })
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit shit <code> src / App.js </code> and save to reload.{' '}
          </p>{' '}
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React{' '}
          </a>{' '}
        </header>{' '}
      </div>
    )
  }
}

export default App
