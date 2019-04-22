import React, { Component } from 'react';
import { Link } from '@reach/router';
import {fetchTopics} from '../../api';

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

    handleClick = (topic) => {
        this.setState({ topic })
    }

    displayTopics = () => {
        const {topics} = this.state;
        return <div className="content">
            {topics.map(topic => {
                return (
                    <div key={topic.slug} className="postedTopic">
                        <p>
                            Topic: {topic.slug} <br/>
                            Description: {topic.description}
                        </p>
                        <div className="postOrReadLinkBG">
                            <Link to={`/topics/${topic.slug}/articles`} key={`articles?topic=${topic.slug}`} className="postOrReadLink">
                            All article(s) about {topic.slug}
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    }
    
    render() {
        const topicCount = this.state.topics ? this.state.topics.length : 0;
        return (
            <div>
                <div className="contentInfoArea">
                    <h2 className="pageTitle">Topics</h2>
                    {this.props.user ? 
                        <Link to="/topics/post" key="topics/post" className="postLink">
                            Create Topic
                        </Link> : 
                        <h4>
                            Login to create a topic!
                        </h4>
                    }
                    {this.props.location.state && this.props.location.state.newTopic && <p className="newPost">Thank you for posting a new topic :)</p>}
                    <h4>Displaying {topicCount} topic(s)</h4>
                </div>
                {this.state.topics && this.displayTopics()}
            </div>
        )
    }
}

export default Topics;