import React, {Component} from 'react';
import {fetchTopics, postArticle} from '../api'
import axios from 'axios';
import {Link, navigate} from '@reach/router'

class ArticlePostScreen extends Component {

    state = {
        "topics": null,
        "topic": null,
        "title": null,
        "body": null,
        missingInfo: false,
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
        const {topic, title, body} = this.state;
        const username = this.props.user;
        event.preventDefault();
        if (topic === "" || title === "" || body === "") {
            this.setState({missingInfo: true})
        }
        else postArticle({title, topic, body, username})
        .then((createdArticle) => {
            navigate(`/articles/${createdArticle.article_id}`, {
                state: {newArticle: true}
            })
        })
        .catch(err => {
            this.setState({missingInfo: true})
        })
    }

    render() {
        return (
            <div>
                <h3>New Article</h3>
                <p>Please ensure you have selected a topic, entered a title and your article before submitting!</p>
                -----------------------------
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
                    <p>Can't find the topic you're looking for? Click <Link to='/topics/post'>here</Link> to create a new one: </p> <br/>
                    <label>
                        Title: 
                        <input type="text" onChange={this.handleChange} data_key="title"></input>
                    </label> <br/>
                    <label>
                        Article: 
                        <textarea data_key="body" onChange={this.handleChange}></textarea>
                    </label> <br/>
                    {this.props.user ? 
                        <button type="submit">Post article!</button> :
                        <h4>You must login before posting!</h4>
                    }
                    {this.state.missingInfo && <h4>Oops! Looks like you are missing something... check you've entered all fields, including the topic!</h4>}
                </form>
            </div>
        )
    }
}

export default ArticlePostScreen;