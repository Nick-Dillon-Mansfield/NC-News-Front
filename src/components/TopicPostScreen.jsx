import React, {Component} from 'react';
import { navigate } from '@reach/router';
import { fetchTopics, postTopic } from '../api';

class TopicPostScreen extends Component {

    state = {
        "topics": null,
        "slug": null,
        "description": null,
        displayInvalidInput: false,
        errorMessage: null,
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
        event.preventDefault();
            postTopic(slug, description)
            .then((res) => {
                console.log('going here...')
                navigate(`/topics`, {
                    state: {newTopic: true}
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    displayInvalidInput: true,
                    errorMessage: err.response.data.message,
                })
            })
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
                    {this.state.displayInvalidInput && <h4>{this.state.errorMessage}</h4>}
                    {this.props.user ? 
                        <button type="submit">Create Topic!</button> :
                        <h4>You must login before creating a topic!</h4>
                    }
                </form>
            </div>
        );
    };

};

export default TopicPostScreen;