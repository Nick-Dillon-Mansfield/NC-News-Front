import React, {Component} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { fetchTopics } from '../api';

class TopicPostScreen extends Component {

    state = {
        "topics": null,
        "slug": null,
        "description": null,
    }

    componentDidMount() {
        fetchTopics().then(topics => {
            this.setState({topics});
        });
    };

    handleChange = (event) => {
        event.preventDefault();
        const stateProp = event.target.getAttribute('data_key');
        this.setState({
            [stateProp]: event.target.value
        });
    };

    handleSubmit = (event) => {
        const {slug, description} = this.state;
        const url = 'https://ncnews-api.herokuapp.com/api/topics'
        event.preventDefault();
        axios.post(url, {
            slug,
            description,
        })
        .then(({data}) => {
            navigate(`/topics`, {
                state: {newTopic: true}
            })
        })
        .catch(err => {console.log(err)})
    }

    render() {
        return (
            <div>
                <h3>New Topic</h3>
                <p>Please ensure you have entered a name for your topic, and a brief description describing what the topic is for!</p>
                -------------------
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Topic Name: 
                        <input type="text" data_key="slug" onChange={this.handleChange}></input>
                    </label> <br/>
                    <label>
                        Topic Description: 
                        <textarea type="text" data_key="description" onChange={this.handleChange}></textarea>
                    </label> <br/>
                    <button type="submit">Create Topic!</button>
                </form>
            </div>
        );
    };

};

export default TopicPostScreen;