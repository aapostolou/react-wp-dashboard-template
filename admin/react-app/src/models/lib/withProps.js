/* eslint-disable react/display-name */
import React from "react";

import useProps from "./useProps";

const EMPTY_OBJECT = {};

const withProps =
  (propsCreators = EMPTY_OBJECT) =>
  (Component) =>
  (props) => {
    const modelProps = useProps(propsCreators);

    return <Component {...modelProps} {...props} />;
  };

export default withProps;
