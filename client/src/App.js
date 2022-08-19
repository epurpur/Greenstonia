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
        title: 'A Good Day to Die',
        active: true,
        info: `<p id="mainTextContent">In the back of the Humpback Rocks Picnic Area is a trail that leads up to an overlook. Under that overlook are some rocks. Under those rocks is a roadcut for the Parkway. Andrew Cassidy and I were bouldering under the overlook one day while establishing problems such as Blue Suede, Wolf God and Jackie Chan's Greatest Kick when suddenly we hear a commotion underneath us from the parkway. We both rush over to the edge to find 3 or 4 kids standing in the road yelling up at another kid, now 25ft off the deck on the roadcut. Cars are continuing by, the kids are yelling, and Andrew and I both go in to "Yer Gonna Die!" mode. Andrew takes off running for the car to get a rope and I stay behind in an attempt to coach this kid up or down, I do not know really. 
        He had found his way up the easier blocky terrain but had now been stymied by a short vertical and relatively featureless section of rock. He was in a good stance and had what appeared to be a good jug to hold onto (this is a greenstone roadcut) and we were discussing the various merits of left or right or toward the tree or towards me or... Well the young man decided he had grown tired of his perch and did what any other invincible teenager in his situation would do. He simply hand foot matched (in New Balances) the jug and pressed it out for the send! As he strode by I surely stammered something at him along the lines of "That was crazy!" or "What were you thinking?" to which he coolly replied "It's not my first time rock climbing." and took off back to his friends like a total legend.
        <br></br>
        This must be one of the most badass ascents in Parkway history: an unreported, ground up, on-sight, free solo, first ascent! (Likely un-repeated as well) I was happy that this was not his first time rock climbing, but even happier that it was not his last. I hope that he will read this and has continued smashing rigs, hopefully with a wider safety margin. Climb on!</p>`,
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
        title: 'Blank Canvas',
        active: true,
        info: `<p id="mainTextContent">I moved to Charlottesville in 2017 and right away started to check out the existing spots on the Parkway. The one that caught my eye immediately was the 12.2 boulder. At that time, the lower hang and drops had been climbed and Elliot Gaunt had been the first to top out the boulder via 'Blue Ridge Beauty'. I was immediately hooked and spent a lot of time the next year repeating both the hang and drops and also some of Elliot's lines such as 'What Could Have Been' and 'Bring Your Own Oxygen'. This was a real learning experience for me as I used ropes to clean and rehearse the topouts, which I had never done before in bouldering. In the process of repeating the existing routes, I couldn't help but notice there were still quite a few lines left to be done!
        <br></br>
        The first new line I set to work on became 'Eye of the Whistle Pig'. Elliot's lines took the obvious route up the middle of the face, but the left side had yet to be climbed. After cleaning and figuring out the line, I climbed it alone on a wet and humid October day in 2019. I probably should have waited for better conditions but I was too excited to get it done! Check the first ascent video below.
        <br></br>
        <iframe width="653" height="400" src="https://www.youtube.com/embed/S1AJamHVR2s" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />

        
        
        </p>`,
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
