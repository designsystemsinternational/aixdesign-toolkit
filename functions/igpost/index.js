import React, { useEffect } from "react";

import * as css from "./styles.module.css";

export const handler = ({ inputs, mechanic }) => {
  const { width, height, blobs, showPictures, _ratio } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <div className={css.root}>
      <svg className={css.background} width={width} height={height}>
        <rect width={width} height={height} fill="white" />
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
      <div className={css.textLayer}>
        <h1>Hey!</h1>
      </div>
    </div>
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
    default: 1080,
    editable: false
  },
  height: {
    type: "number",
    default: 1080,
    editable: false
  }
};

export const presets = {
  instagramPost: {
    width: 1080,
    height: 1080
  }
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
