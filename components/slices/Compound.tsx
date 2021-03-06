import React, {useState, useEffect} from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
// @ts-ignore
import Handle,{ Track, Tick } from "../component.tsx"; // example render components - source below

const sliderStyle = {
  position: "relative",
  width: "100%",
};

const railStyle = {
  position: "absolute",
  width: "100%",
  height: 8,
  borderRadius: 4,
  cursor: "pointer",
  backgroundColor: "rgb(100,100,100)"
};



const Compound = ({setState, defaultValue, text}) => {
    const [domain, setDomaine] = useState([1, 100]);
    const handleChange=(event)=>{
      setState(event);
    }
    return (
      <div className="bloc-slider">
        <Slider
          mode={2}
          step={1}
          domain={domain}
          onChange={(event)=>handleChange(event)}
          rootStyle={sliderStyle}
          values={defaultValue}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    text={text}
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
}

export default Compound;
