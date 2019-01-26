/*global chrome*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


chrome.storage.sync.set({'address': '4644 West 15th'}, function() {
  console.log('Value is set to ' + '4644 West 15th');
});

chrome.storage.sync.get(['address'], function(result) {
  console.log(result);
  console.log('Value currently is ' + result.key);
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit shit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
