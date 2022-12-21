import React from "react";

import * as css from "./styles.module.css";

export const initValue = input => input.default;

export const prepareValue = (value, input) => {
  return value == null ? input.default : value;
};

export const Input = ({ name, values, onChange, inputDef }) => {
  const value = values[name] ?? [];

  console.log({ inputDef });

  return (
    <div className={css.container}>
      <label>Color background</label>
    </div>
  );
};
