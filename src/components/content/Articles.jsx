import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import { fetchTopics, fetchArticles } from '../../api';
import PostsDisplayer from '../utilities/PostsDisplayer';

class Articles extends Component {
    state = {
        articles: null,
        topic: this.props.topic,
        url: 'https://ncnews-api.herokuapp.com/api/articles/',
        articleDeleted: false,
        articleCount: 0
    }

    componentDidMount() {
        let url = this.state.url
        if (this.props.topic) {
            fetchTopics()
            .then((topics) => {
                if (topics.every(topic => {
                    return topic.slug !== this.props.topic
                })) {navigate('/Page404')}
            })
            url+=`?topic=${this.props.topic}`
        } 
        fetchArticles(url)
        .then(articles => {
            this.setState({
                articles,
                articleCount: articles.length,
            })
        })
        .catch(err => {
            if (err.response.status === 404) this.setState({articleCount: 0})
        });
    };
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.articles !== this.state.articles) {
            this.setState({articles: this.state.articles});
        };
        if (prevState.topic !== this.props.topic) {
            let url = this.state.url
            if (this.props.topic) url+=`?topic=${this.props.topic}` 
            fetchArticles(url)
            .then(articles => {
                this.setState({
                    articles,
                    articleCount: articles.length,
                    topic: this.props.topic
                })
            })
        };
    };
    
    
    handleSortByChange = (event) => {
        const sortByURL = event.target.value
        event.preventDefault();
        fetchArticles(`${sortByURL}`)
        .then((articles) => {
            this.setState({
                articles
            })
        });
    };

    updateCounter = (newCount) => {
        this.setState(prevState => ({
            articleCount: +prevState.articleCount + +newCount
        }))
    }

    render() {
        const {articles, articleCount} = this.state;
        const subject = this.state.topic ? `about ${this.state.topic}` : ""
        const subjectURL = this.state.topic ? `topic=${this.state.topic}&` : ""
        const sortByURL = this.state.url + '?' + subjectURL + "sort_by=";
        return (
            <div>
                <h2 className="pageTitle">Articles</h2>
                {articles && articleCount === 0 ? <h4>loading...</h4> : articleCount > 0 ? <h4>Displaying {articleCount} article(s) {subject}</h4> : <h4>Looks like there are no articles about {subject}! Why don't you post one?</h4>}
                {this.props.user ? 
                    <Link to="/articles/post" key='articles/post' >
                        Post Article
                    </Link> :
                    <h4>
                        Login to post an article!
                    </h4>
                }
                {this.state.articleCount ? <form>
                    <select onChange={this.handleSortByChange}>
                        <option value={`${sortByURL}created_at&order=desc`}>Date (newest to oldest)</option>
                        <option value={`${sortByURL}created_at&order=asc`} >Date (oldest to newest)</option>
                        <option value={`${sortByURL}comment_count&order=desc`}>Comments (most to fewest)</option>
                        <option value={`${sortByURL}comment_count&order=asc`} >Comments (fewest to most)</option>
                        <option value={`${sortByURL}votes&order=desc`}>Votes (most to fewest)</option>
                        <option value={`${sortByURL}votes&order=asc`} >Votes (fewest to most)</option>
                    </select>
                </form> : null}
                {this.state.articles && <div className="content">
                    {this.state.articles.map(article => {
                        return <PostsDisplayer key={article.article_id} type="Article" article={article} user={this.props.user} updateCounter={this.updateCounter}/>
                    })}
                </div>}
            </div>
        )
    }
}

export default Articles