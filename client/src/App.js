import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

/* CSS Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* Pages */
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";
import AreasPage from "./pages/AreasPage";
import HistoryPage from "./pages/HistoryPage";
import ContactPage from "./pages/ContactPage";

/* Components */

/* Apollo Setup */
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
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
            <Route exact path="/weather">
              <WeatherPage />
            </Route>
            <Route exact path="/areas">
              <AreasPage />
            </Route>
            <Route exact path="/history">
              <HistoryPage />
            </Route>
            <Route exact path="/contact">
              <ContactPage />
            </Route>

          </Switch>
        </div>

      </Router>
    </ApolloProvider>
  );
}

export default App;
