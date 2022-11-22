import React, { useEffect } from "react";

export const handler = ({ inputs, mechanic }) => {
  const { width, height, blobs } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={width} height={height}>
      {blobs.map(({ path, fill, viewBox, width, height }, index) => (
        <svg key={index} width={width} height={height} viewBox={viewBox}>
          <path d={path} fill={fill} />
        </svg>
      ))}
    </svg>
  );
};

export const inputs = {
  blobs: {
    type: "blobs"
  },
  width: {
    type: "number",
    default: 400
  },
  height: {
    type: "number",
    default: 300
  }
  // color: {
  //   type: "color",
  //   model: "hex",
  //   default: "#E94225"
  // }
};

export const settings = {
  engine: require("@mechanic-design/engine-react"),
  hideNavigation: true,
  hidePresets: true,
  hideScaleToFit: true,
  hideAutoRefresh: true,
  optimize: false
};
