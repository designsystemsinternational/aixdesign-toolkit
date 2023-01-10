import React from "react";

const horizontalOptions = ["right", "left"];
const verticalOptions = ["top", "bottom"];

export const getGridDimensions = (
  width,
  height,
  imagePosition,
  imageSize,
  rows = 6,
  cols = 6
) => {
  const rowSize = height / rows;
  const colSize = width / cols;
  const verticalMarginSize = rowSize / 3;
  const horizontalMarginSize = colSize / 3;

  const availableRows = Math.max(
    0,
    rows - (verticalOptions.includes(imagePosition) ? imageSize : 0)
  );
  const availableCols = Math.max(
    0,
    cols - (horizontalOptions.includes(imagePosition) ? imageSize : 0)
  );

  const xOffset = imagePosition === "left" ? imageSize * colSize : 0;
  const yOffset = imagePosition === "top" ? imageSize * rowSize : 0;
  const columns = [];

  for (let col = 0; col < availableCols + 1; col++) {
    columns.push(colSize * col + xOffset);
  }
  const rowss = [];
  for (let row = 0; row < availableRows + 1; row++) {
    rowss.push(rowSize * row + yOffset);
  }

  const [top, right, bottom, left] = [
    verticalMarginSize + (imagePosition === "top" ? imageSize * rowSize : 0),
    (imagePosition === "right" ? availableCols * colSize : width) -
      horizontalMarginSize,
    (imagePosition === "bottom" ? availableRows * rowSize : height) -
      verticalMarginSize,
    horizontalMarginSize + (imagePosition === "left" ? imageSize * colSize : 0)
  ];

  return {
    cols: columns,
    rows: rowss,
    top,
    right,
    bottom,
    left,
    width,
    height,
    rowSize,
    colSize
  };
};

export const Grid = ({ className, grid, opacity = 0.13 }) => {
  return (
    <svg className={className} width={grid.width} height={grid.height}>
      <g fill={`rgba(252, 102, 83, ${opacity})`}>
        <rect
          width={grid.cols[grid.cols.length - 1]}
          height={grid.top - grid.rows[0]}
          y={grid.rows[0]}
          x={grid.cols[0]}
        />
        <rect
          width={grid.left - grid.cols[0]}
          height={grid.rows[grid.rows.length - 1]}
          y={grid.rows[0]}
          x={grid.cols[0]}
        />
        <rect
          width={grid.cols[grid.cols.length - 1]}
          height={grid.top}
          y={grid.bottom}
          x={grid.cols[0]}
        />
        <rect
          width={grid.cols[grid.cols.length - 1] - grid.right}
          height={grid.rows[grid.rows.length - 1]}
          x={grid.right}
          y={grid.rows[0]}
        />
      </g>
      <g stroke={`rgba(252, 102, 83, ${opacity})`}>
        {grid.cols.map(col => (
          <line
            key={col}
            x1={col}
            x2={col}
            y1={grid.rows[0]}
            y2={grid.rows[grid.rows.length - 1]}
          />
        ))}
        {grid.rows.map(row => (
          <line
            key={row}
            y1={row}
            y2={row}
            x1={grid.cols[0]}
            x2={grid.cols[grid.cols.length - 1]}
          />
        ))}
      </g>
    </svg>
  );
};
