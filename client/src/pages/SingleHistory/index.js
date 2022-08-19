import React from 'react'

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

//use destructuring to get elements of each story
const SingleHistory = ( {title, info, imgLink, author} ) => {
  return (
    <>
      <Header />
      <div id='titleHolder'>
        <h1 id='singleHistoryTitle'>{title}</h1>
        <h3 id='singleHistoryAuthor'>by: {author} </h3>
      </div>
      <section id="mainTextContent">
        <p dangerouslySetInnerHTML={{__html: info}}></p>
      </section>
      <Footer />
    </>
  )
}

export default SingleHistory;