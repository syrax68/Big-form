// @flow weak

import React, {useState} from "react";
import PropTypes from "prop-types";

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
const Handle = ({domain, handle, getHandleProps, text}) => {
  const [showTooltip, setShowToolTip] = useState(false);
  // const {
  //   domain: [min, max],
  //   handle: { id, value, percent },
  //   getHandleProps
  // } = this.props;

    return (
      <React.Fragment>
        {showTooltip ? (
          <div
            style={{
              left: `${handle.percent}%`,
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-30px"
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">{handle.value} {text}</span>
            </div>
          </div>
        ) : null}
        <div
          role="slider"
          aria-valuemin={domain.min}
          aria-valuemax={domain.max}
          aria-valuenow={handle.value}
          style={{
            left: `${handle.percent}%`,
            position: "absolute",
            marginLeft: "-11px",
            marginTop: "-9px",
            zIndex: 2,
            width: 24,
            height: 24,
            cursor: "pointer",
            borderRadius: "50%",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.4)",
            backgroundColor: "darkgray"
          }}
          {...getHandleProps(handle.id, {
            onMouseLeave: () => {
              setShowToolTip(false)
            },
            onMouseOver: () => {
              setShowToolTip(true)
            }
          })}
        />
      </React.Fragment>
    )
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired
};

export default Handle;

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: "absolute",
        height: 8,
        zIndex: 1,
        backgroundColor: "darkgrey",
        borderRadius: 4,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, count, format }) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: '10px',
          width: 1,
          height: 5,
          backgroundColor: "rgb(200,200,200)",
          left: `${tick.percent}%`
        }}
      />
      <div
        style={{
          position: "absolute",
          background: "transparent",
          marginTop: 22,
          fontSize: 10,
          color: `#fff`,
          fontFamily: "Arial",
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired
};

Tick.defaultProps = {
  format: d => d
};
