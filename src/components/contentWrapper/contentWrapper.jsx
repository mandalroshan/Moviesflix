import React from "react";

import "./style.scss";

// This component will used to bring all content at center.

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;


