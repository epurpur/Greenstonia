import React, { useState } from 'react';

/* Components */
import { Button, Modal } from 'react-bootstrap';

/* CSS styles */
import "./styles.css";

const ImageCards = (props) => {

    // controls for image modals
    const [showImageModal, setShowImageModal] = useState(false);
    const handleCloseImageModal = () => setShowImageModal(false);
    const handleShowImageModal = () => setShowImageModal(true);

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
          <>
            <Button className='modalButton' onClick={handleShowImageModal}><img src={require(`../../uploadedImages/${url}`).default} className='imageCards'></img></Button>
            <Modal show={showImageModal} onHide={handleCloseImageModal}>
              <img src={require(`../../uploadedImages/${url}`).default}></img>
            </Modal>
          </>
        ))}



      </>
  )
}

export default ImageCards;