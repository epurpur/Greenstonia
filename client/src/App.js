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
import EditorPage from "./pages/EditorPage";

/* Components */

/* User Context Providers */
/* This is like a global state that wraps around all components/pages */
import UserProvider from "./utils/UserContext";
import PageProvider from "./utils/PageContext";
import EditorProvider from "./utils/EditorContext";

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
        Here is my video of "What Could Have Been":
        <br><br>
        <iframe className="embedVideo" width="653" height="400" src="https://www.youtube.com/embed/Utsw8W74TwE" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br><br>
        And "Bring Your Own Oxygen"
        <br><br>
        <iframe className="embedVideo" width="653" height="400" src="https://www.youtube.com/embed/HJPhSMAQeos" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br><br>
        The first new line I set to work on became "Eye of the Whistle Pig". Elliot's lines took the obvious route up the middle of the face, but the left side had yet to be climbed. After cleaning and figuring out the line, I climbed it alone on a wet and humid October day in 2019. I probably should have waited for better conditions but I was too excited to get it done! Check the first ascent video below.
        <br></br>
        <iframe className="embedVideo" width="653" height="400" src="https://www.youtube.com/embed/S1AJamHVR2s" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br><br>
        After "Eye of the Whistle Pig" I took a short break from the 12.2 boulder for a sport climbing trip to the Red River Gorge. I had the trip of my life, climbing routes way beyond my expectations. Clearly I was in good form! When I returned to Virginia, 12.2 was still on my mind. I had been eyeing the wall to the right of "Razzle Dazzle". It was quite a nice stretch of rock with just a few imperfections that yielded some bad crimps. Over the course of a few weeks with some help from firends to figure out the moves, it was coming together. I was very close to doing it around Thanksgiving that year and with a good weather forecast, I went out the day after Thanksgiving with as many pads as I could fit in my car (7 I think).
        I was able to do it that day and the line became "Humdinger" and it is my personal favorite on the boulder. I think it climbs really well and is not quite as tall as the others, making it a bit more approachable. Right before I sent it, I fell from the move to the lip of the boulder and it was fine. Unfortunately that day the sun was bright and made it impossible to get a good angle for video, but I filmed it anyway which you can see below:
        <br><br>
        <iframe className="embedVideo" width="653" height="400" src="https://www.youtube.com/embed/oLLZeNinSE0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br><br>
        Fast forward a few months to Spring 2020. This was a strange time in the world with the Covid pandemic going on. The parkway was closed in order to keep people from gathering in large groups. However, it was still legal to walk on the road. Instead of being a roadside boulder, 12.2 was now a 1.3 mile walk in from the Three Ridges parking lot. No problem as the views are nice! I had spied yet another line up the middle of the boulder, right of "Eye of the Whistle Pig" but left of "Blue Ridge Beauty". One day, Mike Farnsworth joined me to carry in quite a few pads and luckily there were some other people at the boulder that day. This meant I got to climb with spotters and the most pads I'd had on any of these lines so far! The line became "True Love". It climbs into a distinctive ear shaped flake before going 
        left to join "Eye of the Whistle Pig". Alas, I didn't get a video which is ironic given that there were other people around that day. "True Love" is maybe the easiest line to the top of the boulder and was named for my love of the 12.2 boulder. The best I can do is to point you to the <a href="https://www.mountainproject.com/route/118778538/true-love" target="_blank">Mountain Project page for this route</a>.
        <br><br>
        In Fall 2020 I returned to 12.2 for some cleanup. I had never done "Blue Ridge Beauty" proper, which climbs "BetaMax" into the original topout that Elliot did. It took me longer than expected to re-learn how to do both "BetaMax" (the first half) and the 2nd half topout. Again, the week of Thanksgiving both the weather and my fitness peaked and went for it. My friend Rojeen joined me at the boulder that day and filmed as I went for it, taking a scary fall from the top. My left hand dry-fired off a small crimp. The video did not capture this but I hip-checked the pads and this sent me running out into the road completely unscathed! Luckily I did not fall higher than that or really might have gotten hurt. Though I got lucky that time, the fall shook me mentally and made me seriously think "should I be up there?".
        I have yet to top out the boulder since then and though I haven't ruled it out, it'll be a calculated attempt if I go for it again. As I currently write this, I am 35 years old and I don't want to take those slams like I used to!
        <br><br>
        <iframe className="embedVideo" width="653" height="400" src="https://www.youtube.com/embed/R6fh1g89OK4" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br><br>
        In the meantime I had also been messing with another new line, "Largemouth Bass", which is both easier and lower than the other lines that top out and is much more approachable to the average climber. I have no epic tale here other than it was just another unclimbed line on this amazing boulder!
        <br><br>
        <iframe className="embedVideo" width="653" height="400" src="https://www.youtube.com/embed/wmqR-xK4Hz8" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <br><br>
        I hope to write an update to this story one day as there are still new lines left to do on the boulder. The 12.2 boulder has given me a lot of good memories and I am very thankful to have it close to home. I hope these stories motivates someone else to pick up the 12.2 torch and carry it into the future!

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

  // controls login context
  const [login, setLogin] = useState(false)
  const providerValue = useMemo(() => ({ login, setLogin}), [login, setLogin])

  // controls page context
  const [pageName, setPageName] = useState('other');
  const pageValue = useMemo(() => ({ pageName, setPageName}), [pageName, setPageName])

  // controls editor page context
  const [editorInfo, setEditorInfo] = useState({ typeID: '', typeName: ''});
  const editorValue = useMemo(() => ({editorInfo, setEditorInfo}), [editorInfo, setEditorInfo])
  
  return (

    // all components need to be inside ApolloProvider tag. Any component inside this tag can now make requests to graphql
    <ApolloProvider client={client}>
      <UserProvider value={providerValue}>  {/* UserContext login value - global state */}
      <PageProvider value={pageValue}>      {/* UserContext page value - global state */}
      <EditorProvider value={editorValue}>  {/* UserContext editor value - global state */}
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
              <Route exact path="/editorPage">
                <EditorPage />
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
      </EditorProvider>
      </PageProvider>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
