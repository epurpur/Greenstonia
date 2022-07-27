import React from 'react';

/* Test import images */

/* CSS styles */
import "./styles.css";

const ImageCards = (props) => {

    const importAll = require =>
    require.keys().reduce((acc, next) => {
        acc[next.replace("./", "")] = require(next);
        return acc;
    }, {});

    //import images into object
    const images = importAll(require.context("../../uploadedImages", false, /\.(png)$/));

    //get URLs of image from image object, stored in Array
    const imageURLs = Object.keys(images)

    return (
      <>
        <div>ImageCards</div>
        <div>
            {imageURLs.map((url) => (
                <p>{url}</p>
                // <img src={`${url}.png`}></img>
            ))}
        </div>
        
      </>
  )
}

export default ImageCards;