import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component"; //Library
import "react-lazy-load-image-component/src/effects/blur.css"; //copyed from Doc from lazy-load-image library

const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            effect="blur"
            src={src}
        />
    );
};

export default Img;