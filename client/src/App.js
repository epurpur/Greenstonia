import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

/* CSS Styles */
import './App.css';

/* Pages */
import LandingPage from "./pages/LandingPage";

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
          <LandingPage />
        </div>

      </Router>
    </ApolloProvider>
  );
}

export default App;
