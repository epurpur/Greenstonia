import React from "react";
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
import RoutesPage from "./pages/RoutesPage";
import SingleRoutePage from "./pages/SingleRoutePage";

/* Components */

/* Apollo Setup */
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",        //short for http://localhost:3001/graphql
  cache: new InMemoryCache(),
});

function App() {
  return (
    // all components need to be inside ApolloProvider tag. Any component inside this tag can now make requests to graphql
    <ApolloProvider client={client}>
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
            <Route exact path="/boulder">
            {/* This will eventually be changed to something like "/boulder/:boulderName" */}
              <BoulderPage />
            </Route>
            <Route exact path="/routes">
            {/* This will eventually be changed to something like "/routes/:routeName" */}
              <RoutesPage />
            </Route>
            <Route exact path="/singleRoute">
            {/* This will eventually be changed to something like "/singleRoute/:singleRouteName" */}
              <SingleRoutePage />
            </Route>

          </Switch>
        </div>

      </Router>
    </ApolloProvider>
  );
}

export default App;
