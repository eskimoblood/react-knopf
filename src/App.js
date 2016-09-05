import React, {Component} from 'react';
import './App.css';
import Knob from './Knob'
import Pointer from './Pointer'
import Scale from './Scale';
import Arc from './Arc';


function Circle({transform, value, r, green}) {
  return <circle
    {...{r, transform}} fill={`hsl(${value}, 100%, 50%)`}/>
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Knob
          size="100"
          style={{background: 'white'} }
          onChange={console.log.bind(console, 'value: ')}
          angleOffset={220}
          angleRange={280}
        >

          <Arc/>
          <Pointer radius="50" type="rect" width="6" height="20">
            {/*<rect width={10} height={10}></rect>*/}
            {/*<Circle green="100" r="10"></Circle>*/}
            {/*<circle r="1"></circle>*/}
            {/*<path d="M0 0 L10 20 L-10 20 Z" fill="#1abc9c" stroke="#95a5a6"/>*/}
          </Pointer>
          <Scale
            angleRange="360"
            steps="30"
            tickWidth="0.5"
            tickHeight="3"
          />
        </Knob>
      </div>
    );
  }
}

export default App;
