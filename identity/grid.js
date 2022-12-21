import React from "react";

export const getGridDimensions = (size, rows = 6, cols = 6, img = [0, 0]) => {
  const width = size;
  const height = size;
  const gridSize = size / 6;
  const marginSize = gridSize / 3;
  const [col0, col1, col2, col3, col4, col5, col6] = [
    0,
    gridSize,
    gridSize * 2,
    gridSize * 3,
    gridSize * 4,
    gridSize * 5,
    size
  ];
  const [row0, row1, row2, row3, row4, row5, row6] = [
    0,
    gridSize,
    gridSize * 2,
    gridSize * 3,
    gridSize * 4,
    gridSize * 5,
    size
  ];
  const [top, right, bottom, left] = [
    marginSize,
    size - marginSize,
    size - marginSize,
    marginSize
  ];
  return {
    cols: [col0, col1, col2, col3, col4, col5, col6],
    rows: [row0, row1, row2, row3, row4, row5, row6],
    top,
    right,
    bottom,
    left,
    width,
    height
  };
};

export const Grid = ({ className, grid, opacity = 0.13 }) => {
  return (
    <svg className={className} width={grid.width} height={grid.height}>
      <g fill={`rgba(252, 102, 83, ${opacity})`}>
        <rect width={grid.width} height={grid.top} />
        <rect width={grid.left} height={grid.height} />
        <rect width={grid.width} height={grid.top} y={grid.bottom} />
        <rect width={grid.left} height={grid.height} x={grid.right} />
      </g>
      <g stroke={`rgba(252, 102, 83, ${opacity})`}>
        {grid.cols.map(col => (
          <line x1={col} x2={col} y1={0} y2={grid.height} />
        ))}
        {grid.rows.map(row => (
          <line y1={row} y2={row} x1={0} x2={grid.width} />
        ))}
      </g>
    </svg>
  );
};
