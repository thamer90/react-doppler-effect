import React from 'react'
import styled from 'styled-components'
import logo from './star.png';
import './App.css';
import LogSlider, { sliderCurve } from "./components/slider";
import 'rc-slider/assets/index.css';

const App = () => {
  const [value, setValue] = React.useState(-100);

  const Img = styled.img`
    filter: saturate(${props => computeVelocity(props.value)}%);
  `;

  // slider on change
  const handleOnChange = (value) => {
    console.log(value); //eslint-disable-line
    setValue(Math.ceil(sliderCurve(value)) - 100)
  }

  // input on change
  const handleChange = (e) => {
    let newValue = e.target.value
    const numberReg = /^\d*$/

    // strip out non-number character and return longest valid number
    // e.g. input 'a12b345c1' should return 345
    if (!numberReg.test(newValue)) {
      const sanitiseValues = newValue.replace(/\s/g, '').replace(/\D/g, ',').split(',').filter(i => i)
      
      if (sanitiseValues.length < 1) {
        return
      }
      
      // get the longest numeric string
      newValue = sanitiseValues.sort((a, b) => b.length - a.length)[0]
    }

    setValue(newValue)
  }

  const computeVelocity = (value) => {
    if (value > 0) {
      return value * 100 + 100
    } else {
      return value + 100
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Img src={logo} className="App-logo" alt="logo" value={value} />
        <div id="slider-section">
          <input type="text" onChange={handleChange} value={value} />
          <LogSlider
            min={1}
            max={200}
            marks={[-100, -70, -40, 0, 40, 70, 100]}
            stepsInRange={100}
            onChange={handleOnChange}
          />
        </div>
        <p>
          The Doppler Effect
        </p>
      </header>
    </div>
  );
}

export default App;
