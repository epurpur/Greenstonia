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
        {imageURLs.map((url) => (
          <img src={require(`../../uploadedImages/${url}`).default} className='imageCards'></img>
        ))}
      </>
  )
}

export default ImageCards;