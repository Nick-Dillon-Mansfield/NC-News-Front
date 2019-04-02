import React, { Component } from 'react';
import axios from 'axios';
import {Router} from "@reach/router";


class Articles extends Component {
    state = {
        articles: null,
        topic: this.props.topic
    }

    getArticles = (url) => {
        return axios.get(url)
          .then(({data: {articles}}) => {
            this.setState({
                articles,
                topic: this.props.topic
            })
          })
      };

    componentDidMount() {
        let url = 'https://ncnews-api.herokuapp.com/api/articles/'
        if (this.props.topic) url+=`?topic=${this.props.topic}` 
        this.getArticles(url);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.articles !== this.state.articles) {
            this.setState({articles: this.state.articles});
        };
        if (prevState.topic !== this.props.topic) {
            let url = 'https://ncnews-api.herokuapp.com/api/articles/'
            if (this.props.topic) url+=`?topic=${this.props.topic}` 
            this.getArticles(url)
        };
    };

    displayArticles = () => {
        const articles = this.state.articles;
        return <ul>
            {articles.map(article => {
                return <div key={article.article_id}>
                    <p>
                        Title: {article.title} <br/>
                        Topic: {article.topic} <br/>
                        Author: {article.author} <br/>
                        Published: {article.created_at}
                    </p>
                </div>
            })}
        </ul>
    };

    render() {
        const articleCount = this.state.articles ? this.state.articles.length : 0;
        const subject = this.state.topic ? `about ${this.state.topic}` : ""
        return (
        <div>
            <h3>Articles</h3>
            <h4>Displaying {articleCount} article(s) {subject}!</h4>
            {this.state.articles && this.displayArticles()}
        </div>
        )}
}

export default Articles