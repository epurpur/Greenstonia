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

  const [login, setLogin] = useState(0)

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
                <HistoryPage />
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
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
