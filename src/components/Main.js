import React, { Component } from "react";
import NavBar from "./NavBar";
import ViewRecipesBox from "../containers/ViewRecipesBox";
import CreateRecipesBox from "../containers/CreateRecipesBox";
import Home from "./Home";
import About from "./About";
import ErrorPage from "./ErrorPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/view" component={ViewRecipesBox} />
          <Route path="/create" component={CreateRecipesBox} />
          <Route path="/about" component={About} />
          <Route component={ErrorPage}/>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default Main;
