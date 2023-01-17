import React from "react";

import { colors } from "../../identity/colors";
import { ColorSelector } from "../blobs/components/ColorSelector";

import * as css from "./styles.module.css";

export const initValue = input => colors.brighter[0];

export const prepareValue = (value, input) => {
  return value == null ? colors.brighter[0] : value;
};

export const Input = ({ name, values, onChange }) => {
  const color = values[name] ?? [];

  return (
    <div className={css.container}>
      <label>Background color</label>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ColorSelector
          value={color}
          onChange={value => onChange(null, name, value)}
          size="1.5em"
        />
      </div>
    </div>
  );
};
