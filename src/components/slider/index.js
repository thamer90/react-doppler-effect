import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const MySlider = Slider.createSliderWithTooltip(Slider);

const prettyInt = (x) =>
  Math.round(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const sliderCurve = Math.exp;
export const inverseCurve = Math.log;

const LogSlider = ({ min, max, stepsInRange, onChange, value }) => (
  <MySlider
    min={inverseCurve(min)}
    max={inverseCurve(max)}
    step={(inverseCurve(max) - inverseCurve(min)) / stepsInRange}
    tipFormatter={(value) => prettyInt(sliderCurve(value))}
    onChange={onChange}
  />
);

export default LogSlider;
