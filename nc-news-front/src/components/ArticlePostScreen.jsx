import React, {Component} from 'react';
import {fetchTopics} from '../api'
import axios from 'axios';
import {navigate} from '@reach/router'

class ArticlePostScreen extends Component {

    state = {
        "topics": null,
        "topic": '',
        "title": '',
        "body": '',
        "username": 'grumpy19'
    }

    componentDidMount() {
        fetchTopics().then(topics => {
            this.setState({topics})
        })
    }

    handleChange = (event) => {
        event.preventDefault();
        const stateProp = (event.target.getAttribute('data_key'))
        this.setState({
            [stateProp]: event.target.value
        })
    }

    handleSubmit = (event) => {
        const {topic, title, body, username} = this.state
        const url = 'https://ncnews-api.herokuapp.com/api/articles'
        event.preventDefault();
        axios.post(url, {
            title,
            topic,
            body,
            username
        })
        .then(({data: {createdArticle}}) => {
            navigate(`/articles/${createdArticle.article_id}`, {
                state: {newArticle: true}
            })
        })
    }

    render() {
        return (
            <div>
                <h3>New Article</h3>
                <p>Please ensure you have selected a topic, entered a title and your article before submitting!</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Select Topic: 
                        <select data_key="topic" onChange={this.handleChange}>
                            <option>...</option>
                            {this.state.topics && this.state.topics.map(topic => {
                                return <option key={topic.slug}>
                                    {topic.slug}
                                </option>
                            })}
                        </select>
                    </label> <br/>
                    <label>
                        Title: 
                        <input type="text" onChange={this.handleChange} data_key="title"></input>
                    </label> <br/>
                    <label>
                        Article: 
                        <textarea data_key="body" onChange={this.handleChange}></textarea>
                    </label> <br/>
                    <button type="submit">Post article!</button>
                </form>
            </div>
        )
    }
}

export default ArticlePostScreen;