import React, { useEffect } from "react";

export const handler = ({ inputs, mechanic }) => {
  const {
    width,
    height,
    color,
    translateX,
    translateY,
    scaleX,
    scaleY,
    rotate
  } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  const transform = `translate(${translateX} ${translateY}) rotate(${rotate} ${
    width / 2
  } ${height / 2}) translate(${width / 3} ${
    height / 3
  }) scale(${scaleX} ${scaleY}) translate(${-width / 3} ${-height / 3})`;

  return (
    <svg width={width} height={height}>
      <path
        fill={color}
        d={`M ${width / 3} ${height / 3} L ${(width * 2) / 3} ${height / 3} L ${
          (width * 2) / 3
        } ${(height * 2) / 3} L ${width / 3} ${(height * 2) / 3} Z`}
        transform={transform}
      />
    </svg>
  );
};

export const inputs = {
  width: {
    type: "number",
    default: 400
  },
  height: {
    type: "number",
    default: 300
  },
  color: {
    type: "color",
    model: "hex",
    default: "#E94225"
  },
  translateX: {
    type: "number",
    default: 0
  },
  translateY: {
    type: "number",
    default: 0
  },
  scaleX: {
    type: "number",
    default: 1,
    min: 0.00000001,
    step: 0.05
  },
  scaleY: {
    type: "number",
    default: 1,
    min: 0.00000001,
    step: 0.05
  },
  rotate: {
    type: "number",
    default: 0,
    min: -360,
    max: 360,
    step: 1,
    slider: true
  }
};

export const settings = {
  engine: require("@mechanic-design/engine-react")
};
