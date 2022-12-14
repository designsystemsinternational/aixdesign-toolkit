import React, { useEffect } from "react";

export const handler = ({ inputs, mechanic }) => {
  const { width, height, blobs, showPictures, _ratio } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="none" stroke="black" />
      <g transform={`scale(${_ratio})`}>
        {blobs.map(({ path, fill, href, transform, x, y }, index) =>
          !showPictures ? (
            <path key={index} d={path} fill={fill} transform={transform} />
          ) : (
            <React.Fragment key={index}>
              <defs>
                <clipPath id={`clip-${index}`}>
                  <path d={path} />
                </clipPath>
              </defs>
              <image
                xlinkHref={href}
                clipPath={`url(#clip-${index})`}
                transform={transform}
              />
            </React.Fragment>
          )
        )}
      </g>
    </svg>
  );
};

export const inputs = {
  blobs: {
    type: "blobs"
  },
  showPictures: {
    type: "boolean",
    default: false
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

  // quick fix, issue with importing input style into function iframe
  // to fix, we need to separate webpack configs and for iframes ignore
  // css from inputs
  // https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
  // https://webpack.js.org/plugins/ignore-plugin/#root
  optimize: false
};
