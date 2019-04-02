import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Router, Link } from '@reach/router';
import Header from './components/Header';
import Account from './components/Account';
import Help from './components/Help';
import Topics from './components/Topics';
import Articles from './components/Articles'

class App extends Component {

  state = {

  }

  getTopics = (url) => {
    return axios.get(url + "/topics")
      .then(({data: {topics}}) => {
        this.setState({topics})
      })
  }


  componentDidMount() {

  };
    
    handleClick = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Account />
        <Link to="topics" key="topics" >
        Topics
        </Link>
        <Link to="articles" key="articles" >
        Articles
        </Link>
        <Router>
          <Topics path="topics" articles={this.state.articles}/>
          <Articles path="articles"/>
          <Articles path="articles/:topic" />
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
