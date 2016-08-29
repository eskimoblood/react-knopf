import React, {Component} from 'react';
import './App.css';
import Knob from './Knob'
import Pointer from './Pointer'
import Scale from './Scale';


function Circle({center, transform, value, r, green, cx, cy}) {
  return <circle
    {...{r, cx, cy, transform}} fill={`rgb(${Math.floor(value)}, ${green}, 0)`}/>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Knob
          size="100"
          style={{background: 'white'} }
          onChange={console.log.bind(console, 'value: ')}>

          <Pointer radius="30">
            <rect fill="lime" width="1" height="20"/>
          </Pointer>
          <Scale
            angleRange="360"
            steps="10"
            tickWidth="1"
            tickHeight="3"
          />
        </Knob>
      </div>
    );
  }
}

export default App;
