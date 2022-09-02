import React, { useContext } from 'react'

/* Components */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

/* CSS styles */
import "./styles.css";

/* Context */
import { PageContext } from "../../utils/PageContext";

//use destructuring to get elements of each story
const SingleHistory = ( {title, info, imgLink, author} ) => {
  
  // setting user context of page
  const { pageName, setPageName } = useContext(PageContext)
  setPageName('other');

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