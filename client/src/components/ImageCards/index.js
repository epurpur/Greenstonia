import React, { useState } from 'react';

/* Components */
import { Modal } from 'react-bootstrap';

/* CSS styles */
import "./styles.css";

const ImageCards = (props) => {

    const [showImageModal, setShowImageModal] = useState(false)

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
        {imageURLs.length == 0 ? 'no images available' : ''}  
        {imageURLs.map((url) => (
          <img src={require(`../../uploadedImages/${url}`).default} className='imageCards'></img>
        ))}
        <Modal show={showImageModal} onHide={'n/a'}>
          <Modal.Title> IMAGE MODAL </Modal.Title>
        </Modal>
      </>
  )
}

export default ImageCards;