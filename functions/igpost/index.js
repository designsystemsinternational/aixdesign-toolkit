import React, { useEffect } from "react";

import { getGridDimensions, Grid } from "../../identity/grid";

import * as css from "./styles.module.css";

export const handler = ({ inputs, mechanic }) => {
  const {
    width,
    height,
    blobBackground,
    backgroundColor,
    showPictures,
    _ratio,
    title,
    showGrid
  } = inputs;

  const grid = getGridDimensions(width);

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <div className={css.root}>
      <svg className={css.background} width={width} height={height}>
        <rect width={width} height={height} fill={backgroundColor} />
        <g transform={`scale(${_ratio})`}>
          {blobBackground.map(
            ({ path, fill, stroke, href, transform, x, y }, index) =>
              !showPictures ? (
                <path
                  key={index}
                  d={path}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={2}
                  transform={transform}
                />
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
      {showGrid && <Grid className={css.grid} grid={grid} opacity={0.5} />}
      <div className={css.textLayer}>
        {!showPictures && (
          <h1
            style={{
              position: "absolute",
              top: grid.top,
              left: grid.left,
              margin: 0,
              fontSize: 77,
              lineHeight: 0.9
            }}
          >
            {title.toUpperCase()}
          </h1>
        )}
      </div>
    </div>
  );
};

export const inputs = {
  title: {
    type: "text",
    default: "Title"
  },
  backgroundColor: {
    type: "color-selector"
  },
  showGrid: {
    type: "boolean",
    default: false
  },
  showPictures: {
    type: "boolean",
    default: false
  },
  blobBackground: {
    type: "blobs"
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
  },
  width2: {
    type: "dimension",
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
