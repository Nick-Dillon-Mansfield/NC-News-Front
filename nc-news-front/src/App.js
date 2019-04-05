import React, { Component } from 'react';
import './App.css';
import './index.css';
import axios from 'axios';
import { Router, Link } from '@reach/router';
import Header from './components/Header';
import Account from './components/Account';
import Help from './components/Help';
import Topics from './components/Topics';
import Articles from './components/Articles';
import SingleArticle from './components/SingleArticle'
import ArticlePostScreen from './components/ArticlePostScreen'
import TopicPostScreen from './components/TopicPostScreen'
import Page404 from './components/Page404'


class App extends Component {

  state = {
    user: null
  }

  getTopics = (url) => {
    return axios.get(url + "/topics")
      .then(({data: {topics}}) => {
        this.setState({topics})
      })
  }

  setUser = (loggedUser) => {
    this.setState({
      user: loggedUser
    })
  }

  handleClick = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="topBar">
          <Header user={this.state.user}/>
          <Account user={this.state.user} setUser={this.setUser}/>
        </div>
        <Link to="topics" key="topics" >
        Topics
        </Link>
        <Link to="articles" key="articles" >
        Articles
        </Link>
        <Router test="Testing">
        {/* HOME (PATH WILL BE '/') */}
          <Topics path="topics" user={this.state.user}/>
          <Articles path="articles" user={this.state.user}/>
          <Articles path="topics/:topic/articles" user={this.state.user}/>
          <SingleArticle path="articles/:article_id" user={this.state.user}/>
          <TopicPostScreen path="topics/post" user={this.state.user}/>
          <ArticlePostScreen path="articles/post" user={this.state.user}/>
          <Page404 default user={this.state.user}/>
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
