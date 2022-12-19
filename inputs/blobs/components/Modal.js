import React from "react";
import ReactDOM from "react-dom";

import * as css from "./Modal.module.css";

export const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={css.root}>
      <div className={css.backdrop} onClick={() => onClose()} />
      <div className={css.dialog}>{children}</div>
    </div>,
    document.body
  );
};
