import React from "react";
import ReactDOM from "react-dom";

const colorOptions = [
  ["#4874FD", "#F59E2E", "#67EED9", "#FFD452", "#FC6653", "#FFF8E7", "#8A6CEF"],
  ["#839BE4", "#FFBD6A", "#95C9C2", "#FFE289", "#F5CCCA", "#FFFCF4", "#AE9DD2"],
  ["#486CB3", "#C68C42", "#29A191", "#D2B250", "#D37366", "#FFFCF5", "#785DB0"]
];

export const ColorSelector = ({ value, onChange, options = colorOptions }) => {
  return (
    <div>
      {options.map(colorArray => (
        <div style={{ display: "flex" }}>
          {colorArray.map(color => (
            <div
              style={{
                width: 30,
                height: 30,
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
