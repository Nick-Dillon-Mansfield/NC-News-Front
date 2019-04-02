import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import {fetchTopics} from '../api';

class Topics extends Component {
    state = {
        articles: null,
        topics: null,
        topic: ''
    }

    componentDidMount() {
        fetchTopics()
        .then((topics) => {
            this.setState({ topics });
        })
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.topics !== this.state.topics) {
            this.setState({topics: this.state.topics})
        }
    }

    handleClick = (topic) => {
        this.setState({ topic })
    }

    displayTopics = () => {
        const topics = this.state.topics;
        return <div>
            {topics.map(topic => {
                return (
                    <div key={topic.slug}>
                        <p>
                            Topic: {topic.slug} <br/>
                            Description: {topic.description}
                        </p>
                        <Link to={`/articles/${topic.slug}`} key={`articles?topic=${topic.slug}`} >
                        All articles about {topic.slug}!
                        </Link>
                    </div>
                )
            })}
        </div>
    }
    
    displayArticlesOnTopic = () => {

        const {articles, topic} = this.state;
        return (
            <div>
                <h3>Articles about {topic}</h3>
                {articles.map(article => {
                    console.log(article.topic + " should be " + topic)
                    if (article.topic === topic) { 
                        return (
                            <div key={topic.slug}>Hello</div>
                        )
                    } else return;
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <h3>Topics</h3>
                {
                    this.state.topic === "" ? 
                        this.state.topics && this.displayTopics() :
                        this.state.articles && this.displayArticlesOnTopic()
                }
            </div>
        )
    }
}

export default Topics;