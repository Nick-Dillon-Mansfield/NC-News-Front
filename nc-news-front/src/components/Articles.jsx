import React, { Component } from 'react';
import {fetchArticles} from '../api';


class Articles extends Component {
    state = {
        articles: null
    }

    componentDidMount() {
        fetchArticles()
        .then((articles) => {
            this.setState({articles});
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.articles !== this.state.articles) {
            this.setState({articles: this.state.articles});
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
        console.log(this.props)
        return (<div>
            <h3>Articles</h3>
            {this.state.articles && this.displayArticles()}
        </div>
        )}
}

export default Articles