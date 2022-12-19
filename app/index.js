import React from "react";
import { Helmet } from "react-helmet";

import "../assets/fonts.css";
import * as css from "./index.module.css";

const Head = () => {
  return (
    <Helmet
      htmlAttributes={{
        lang: "en"
      }}
      defaultTitle="AIxDesign Toolkit"
    >
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>AIxDesign Toolkit</title>
      <meta name="description" content="AIxDesign Toolkit" />
      <link rel="icon" href="static/favicon.svg" type="image/svg+xml" />
    </Helmet>
  );
};

export const SideBar = props => {
  return (
    <aside className={css.root}>
      <Head />
      <h1>AIxDesign Toolkit Instagram Post</h1>
      {props.children}
    </aside>
  );
};
