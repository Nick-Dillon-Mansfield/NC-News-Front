import React, { Component } from 'react';
import './index.css';
import './App.css';
import { Router, Link } from '@reach/router';
import Header from './components/content/Header';
import Home from './components/content/Home';
import Account from './components/content/Account';
import Topics from './components/content/Topics';
import Articles from './components/content/Articles';
import Help from './components/content/Help';
import About from './components/content/About';
import SingleArticle from './components/content/SingleArticle'
import ArticlePostScreen from './components/posters/ArticlePostScreen'
import TopicPostScreen from './components/posters/TopicPostScreen'
import Page404 from './components/content/Page404'
import topicsIcon from './cssFiles/topicsIconLightBlue.png'
import homeIcon from './cssFiles/homeIconLightBlue.png'
import articlesIcon from './cssFiles/articlesIconLightBlue.png'


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
    const {user} = this.state;
    return (
      <div className="App">
        <div className="topBar">
          <div className="header">
          <Header user={user} className="title"/>
          </div>
          <div className="navButtons">
            <div>
            <Link to="/" key="home" className="home"> <img className="navLogo" src={homeIcon}/> </Link>
            </div>
            <div>
            <Link to="topics" key="topics" className="topics"> <img className="navLogo" src={topicsIcon}/> </Link>
            </div>
            <div>
            <Link to="articles" key="articles" className="articles"> <img className="navLogo" src={articlesIcon}/> </Link>
            </div>
          </div>
          <div className="account">
          <Account user={user} setUser={this.setUser} className='login'/>
          </div>
        </div>
        <div className="contentArea">
        <Router>
          <Home default />
          <Topics path="topics" user={user}/>
          <Articles path="articles" user={user}/>
          <Help path="help" />
          <About path="about" />
          <Articles path="topics/:topic/articles" user={user}/>
          <SingleArticle path="articles/:article_id" user={user}/>
          <TopicPostScreen path="topics/post" user={user}/>
          <ArticlePostScreen path="articles/post" user={user}/>
          <Page404 path='/Page404' user={user}/>
        </Router>
        </div>
        <div className="helpBar">
        <Link to="about" key="about" className="about"> About </Link>
        <Link to="help" key="help" className="help"> Help </Link>
        </div>
      </div>
    );
  }
}

export default App;
