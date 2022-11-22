import React from "react";

import * as css from "./index.module.css";

export const SideBar = props => {
  return (
    <aside className={css.root}>
      <h1>AIxDesign Toolkit</h1>
      {props.children}
    </aside>
  );
};
