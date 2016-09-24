import React, { Component } from 'react';
import './App.css';
import {P1, P2, P3, P4, P5} from './presets'

class App extends Component {
  render() {
    return (
      <div className="App">
        <P1
          color="#5ca8f5"
          background="#4b4f5b"
        />

        <P2
          color="#5ca8f5"
          background="#4b4f5b"
        />
        <P3
          color="#5ca8f5"
          background="#4b4f5b"
          strokeWidth={5}
        />
        <P4
          color="#5ca8f5"
          background="#4b4f5b"
          tickWidth={1.3}
        />
        <P5
        />

      </div>
    );
  }
}

export default App;
