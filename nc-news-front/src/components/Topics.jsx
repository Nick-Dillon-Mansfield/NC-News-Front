import React, { Component } from 'react';
import { Link } from '@reach/router';
import {fetchTopics} from '../api';

class Topics extends Component {
    state = {
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
                        <Link to={`/articles?topic=${topic.slug}`} key={`articles?topic=${topic.slug}`} onClick={() => this.handleClick(topic.slug)}>
                        All articles about {topic.slug}!
                        </Link>
                    </div>
                )
            })}
        </div>
    }

    render() {
        return (
            <div>
                <h3>Topics</h3>
                {this.state.topics && this.displayTopics()}
            </div>
        )
    }
}

export default Topics;