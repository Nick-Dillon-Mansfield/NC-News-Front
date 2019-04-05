import React, { Component } from 'react';
import './index.css';
import './App.css';
import { Router, Link } from '@reach/router';
import Header from './components/Header';
import Home from './components/Home';
import Account from './components/Account';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Help from './components/Help';
import About from './components/About';
import SingleArticle from './components/SingleArticle'
import ArticlePostScreen from './components/ArticlePostScreen'
import TopicPostScreen from './components/TopicPostScreen'
import Page404 from './components/Page404'


class App extends Component {

  state = {
    user: null
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
        <div >
          <Header user={this.state.user} className='title'/>
          <Account user={this.state.user} setUser={this.setUser} className='login'/>
        </div>
        <div className='navBar'>
        <Link to="/" key="home" > Home </Link>
        <Link to="topics" key="topics" > Topics </Link>
        <Link to="articles" key="articles" > Articles </Link>
        <Link to="about" key="about"> About </Link>
        <Link to="help" key="help"> Help </Link>
        </div>
        <Router>
          <Home default />
          <Topics path="topics" user={this.state.user}/>
          <Articles path="articles" user={this.state.user}/>
          <Help path="help" />
          <About path="about" />
          <Articles path="topics/:topic/articles" user={this.state.user}/>
          <SingleArticle path="articles/:article_id" user={this.state.user}/>
          <TopicPostScreen path="topics/post" user={this.state.user}/>
          <ArticlePostScreen path="articles/post" user={this.state.user}/>
          <Page404 path='/Page404' user={this.state.user}/>
        </Router>
      </div>
    );
  }
}

export default App;
