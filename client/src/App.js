import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

/* CSS Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* Pages */
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";
import BoulderPage from "./pages/BoulderPage";
import SingleRoutePage from "./pages/SingleRoutePage";
import AreasPage from "./pages/AreasPage";
import UploadForm from "./pages/UploadForm";
import SingleHistory from "./pages/SingleHistory";

/* Components */

/* User Context Provider */
/* This is like a global state that wraps around all components/pages */
import UserProvider from "./utils/UserContext";

/* Apollo Setup */
const client = new ApolloClient({
    uri: "http://localhost:3001/graphql",        //short for http://localhost:3001/graphql
    cache: new InMemoryCache(),
});

function App() {

  const [historyStory, setHistoryStory] = useState([
    {
        id: 1,
        title: 'The Birth of Greenstone Bouldering',
        active: true,
        info: `this is test info`,
        imgLink: 'barrycondron',
        author: 'Barry Condron'
    },
    {
        id: 2,
        title: 'Blue Ridge Beauty',
        active: true,
        info: `more test info`,
        imgLink: 'elliotgaunt',
        author: 'Elliot Gaunt'
    },
    {
        id: 3,
        title: 'A Long Way from Thailand',
        active: true,
        info: 'Brad Ausink story',
        imgLink: 'bradausink',
        author: 'Brad Ausink'
    },
    {
        id: 4,
        title: "Straight from the horse's mouth",
        active: true,
        info: 'Matt Behrens Story',
        imgLink: 'mattbehrens',
        author: 'Matt Behrens'
    },
    {
        id: 5,
        title: 'The skyline drive rennaisance',
        active: true,
        info: 'Matt Fanning Story',
        imgLink: 'mattfanning',
        author: 'Matt Fanning'
    },
    {
        id: 6,
        title: 'Life After Greenstone',
        active: true,
        info: 'dave cohen story of life after greenstone',
        imgLink: 'davecohen',
        author: 'Dave Cohen'
    },
    {
        id: 7,
        title: 'Mycotic Break',
        active: true,
        info: 'Andrew Cassidy story of Mycotic Break',
        imgLink: 'andrewcassidy',
        author: 'Andrew Cassidy'
    },
    {
        id: 8,
        title: 'Parker Smith story',
        active: true,
        info: 'Parker Smith Story',
        imgLink: 'parkersmith',
        author: 'Parker Smith'
    },
    {
        id: 9,
        title: 'Super Duper Snake',
        active: true,
        info: 'Ross Elliot FA of Super Duper Snake',
        imgLink: 'rosselliot',
        author: 'Ross Elliott'
    },
    {
        id: 10,
        title: 'Filling in the lines',
        active: true,
        info: 'Story of some more of the FAs on the 12.2 boulder',
        imgLink: 'erichpurpur',
        author: 'Erich Purpur'
    },
    {
        id: 11,
        title: 'Lockdown bushwhacking',
        active: true,
        info: 'Peter Malander story',
        imgLink: 'petermalander',
        author: 'Peter Malander'
    },
    {
        id: 13,
        title: 'Tyler Hogan story',
        active: true,
        info: 'Tyler Hogan Story',
        imgLink: 'tylerhogan',
        author: 'Tyler Hogan'
    },
    {
        id: 13,
        title: 'Mike Farnsworth story',
        active: true,
        info: 'Mike Farnsworth story',
        imgLink: 'mikefarnsworth',
        author: 'Tyler Hogan'
    },
  ])

  const [login, setLogin] = useState(false)

  const providerValue = useMemo(() => ({ login, setLogin}), [login, setLogin])
  return (

    // all components need to be inside ApolloProvider tag. Any component inside this tag can now make requests to graphql
    <ApolloProvider client={client}>
      <UserProvider value={providerValue}>  {/* UserContext login value - global state*/}
        <Router>
          <div className="App">
            {/* Establishing routes to all endpoints */}
            <Switch>

              <Route exact path="/">
                <LandingPage />
              </Route>  
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/history">
                <HistoryPage historyStory={historyStory}/>
              </Route>
              <Route exact path="/contact">
                <ContactPage />
              </Route>
              <Route exact path="/area/:areaName">
                <AreasPage />
              </Route>
              <Route exact path="/boulder/:boulderName">
                <BoulderPage />
              </Route>
              <Route exact path="/singleRoute/:routeName">
                <SingleRoutePage />
              </Route>
              <Route exact path="/uploadForm">
                <UploadForm />
              </Route>

              {/* Map over history stories and make route for each one. */}
              {historyStory.map((history) => (
                <Route exact path={`/history/${history.title}`}>
                  <SingleHistory
                      title={history.title}
                      info={history.info}
                      imgLink={history.imgLink}
                      author={history.author}
                  />
                </Route>
              ))}

            </Switch>
          </div>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
