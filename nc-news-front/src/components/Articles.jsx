import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import DeleteButton from './DeleteButton';


class Articles extends Component {
    state = {
        articles: null,
        topic: this.props.topic,
        url: 'https://ncnews-api.herokuapp.com/api/articles/'
    }

    componentDidMount() {
        let url = this.state.url
        if (this.props.topic) url+=`?topic=${this.props.topic}` 
        this.getArticles(url);
    };
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.articles !== this.state.articles) {
            this.setState({articles: this.state.articles});
        };
        if (prevState.topic !== this.props.topic) {
            let url = this.state.url
            if (this.props.topic) url+=`?topic=${this.props.topic}` 
            this.getArticles(url)
        };
    };
    
    handleSortByChange = (event) => {
        const sortByURL = event.target.value
        event.preventDefault();
        axios.get(`${sortByURL}`)
            .then(({data: {articles}}) => {
                this.setState({
                    articles
                })
            });
    };

    getArticles = (url) => {
        return axios.get(url)
          .then(({data: {articles}}) => {
            this.setState({
                articles,
                topic: this.props.topic
            })
          })
      };

    displayArticles = () => {
        const articles = this.state.articles;
        return <ul>
            {articles.map(article => {
                const {title, topic, author, created_at, comment_count, article_id, votes} = article
                return <div key={article_id}>
                =====================
                    <p>
                        Title: {title} <br/>
                        Topic: {topic} <br/>
                        Author: {author} <br/>
                        Published: {created_at} <br/>
                ------
                    </p>
                    <h6>Votes: {votes}  ||  Comments: {comment_count}</h6>
                    <Link to={`/articles/${article_id}`} key={`${article_id}`}>
                        Open Article
                    </Link><br />
                    {author === this.props.user && <DeleteButton id={article_id} type="Article"/>}
                </div>
            })}
        </ul>
    };

    render() {
        const articleCount = this.state.articles ? this.state.articles.length : 0;
        const subject = this.state.topic ? `about ${this.state.topic}` : ""
        const subjectURL = this.state.topic ? `topic=${this.state.topic}&` : ""
        const sortByURL = this.state.url + '?' + subjectURL + "sort_by=";
        return (
            <div>
                <h3>Articles</h3>
                <h4>Displaying {articleCount} article(s) {subject}!</h4>
                {this.props.user ? 
                    <Link to="/articles/post" key='articles/post'>
                        Post Article!
                    </Link> :
                    <h4>
                        Login to post an article!
                    </h4>
                }
                <form>
                    <select onChange={this.handleSortByChange}>
                        <option value={`${sortByURL}created_at&order=desc`}>Date (newest to oldest)</option>
                        <option value={`${sortByURL}created_at&order=asc`} >Date (oldest to newest)</option>
                        <option value={`${sortByURL}comment_count&order=desc`}>Comments (most to fewest)</option>
                        <option value={`${sortByURL}comment_count&order=asc`} >Comments (fewest to most)</option>
                        <option value={`${sortByURL}votes&order=desc`}>Votes (most to fewest)</option>
                        <option value={`${sortByURL}votes&order=asc`} >Votes (fewest to most)</option>
                    </select>
                </form>
                {this.state.articles && this.displayArticles()}
            </div>
        )
    }
}

export default Articles