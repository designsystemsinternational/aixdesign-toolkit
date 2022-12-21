import React from "react";

import { colors } from "../../../identity/colors";

const colorOptions = [colors.brighter, colors.original, colors.darker];

export const ColorSelector = ({
  value,
  onChange,
  options = colorOptions,
  size = 30
}) => {
  return (
    <div>
      {options.map(colorArray => (
        <div style={{ display: "flex" }}>
          {colorArray.map(color => (
            <div
              style={{
                width: size,
                height: size,
                background: color,
                borderRadius: 5,
                margin: 1,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: value === color ? "black" : "#C1C1C1"
              }}
              onClick={() => onChange(color)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
