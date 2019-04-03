import React, { Component } from 'react';
import { Link } from '@reach/router';
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
        const {topics} = this.state;
        return <div>
            {topics.map(topic => {
                return (
                    <div key={topic.slug}>
                        <p>
                            Topic: {topic.slug} <br/>
                            Description: {topic.description}
                        </p>
                        <Link to={`/topics/${topic.slug}/articles`} key={`articles?topic=${topic.slug}`} >
                        All article(s) about {topic.slug}!
                        </Link>
                    </div>
                )
            })}
        </div>
    }
    
    render() {
        const topicCount = this.state.topics ? this.state.topics.length : 0;

        return (
            <div>
                <h3>Topics</h3>
                <Link to="/topics/post" key="topics/post">
                    Create Topic!
                </Link>
                {this.props.location.state.newTopic && <p className="newPost">Thank you for posting a new topic!</p>}
                <h4>Displaying {topicCount} topics!</h4>
                {this.state.topics && this.displayTopics()}
            </div>
        )
    }
}

export default Topics;