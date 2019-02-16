import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

import Navbar from "./components/layout/Navbar";
import Products from "./components/products/Products";
import Locations from "./components/Locations/Locations";
import "./App.css";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Products} />
              <Route path="/locations" component={Locations} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
