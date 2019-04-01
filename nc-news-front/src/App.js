import React, { Component } from 'react';
import './App.css';
import { Router, Link } from '@reach/router';
import Header from './components/Header';
import Account from './components/Account';
import Help from './components/Help';
import Topics from './components/Topics';
import Articles from './components/Articles'

class App extends Component {

  state = {

  }

  componentDidMount() {
    const url = 'https://ncnews-api.herokuapp.com/api'
  };

  handleClick = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Account />
        <Link to="topics" key="topics" onClick={() => this.handleClick()}>
        Topics
        </Link>
        <Link to="articles" key="articles" onClick={() => this.handleClick()}>
        Articles
        </Link>
        <Router>
          <Topics path="topics"/>
          <Articles path="articles"/>
        </Router>
        <button>
          About
        </button>
        <Help />
      </div>
    );
  }
}

export default App;
