import React from "react";
import { connect } from "react-redux";
import {
  moveClockwise,
  moveCounterClockwise,
} from "../state/action-creators.js";

function Wheel({ rotation, moveClockwise, moveCounterClockwise }) {
  return (
    <div id="wrapper">
      <div id="wheel" style={{ "--rotation": rotation }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`cog ${i === rotation ? "active" : ""}`}
            style={{ "--i": i }}
          >
            {i === rotation ? "B" : ""}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={moveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  rotation: state.wheel,
});

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
