import React, {Component} from 'react';
import './App.css';
import ViewRecipesBox from './containers/ViewRecipesBox';

class App extends Component {
  render() {
    return(
      <>
        <h1>Bread Boss </h1>
        <ViewRecipesBox />
      </>
    )
  }
}

export default App;
