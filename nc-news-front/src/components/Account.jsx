import React, {Component} from 'react';
import {fetchUsers} from '../api'

class Account extends Component {
    
    state = {
        users: null,
        user: null,
        isValidUser: null,
    }

    componentDidMount() {
        fetchUsers()
        .then((users) => {
            this.setState({
                users
            })
        })
    }

    checkUsername = (user, userList) => {
        const existingUsername = userList.some(existingUser => {
            return existingUser.username === user
        });
        console.log("checkUsername returns " + existingUsername)
        this.setState({
            isValidUser: existingUsername
        })
    }

    handleSubmit = (event) => {
        const {user, users} = this.state;
        event.preventDefault();
        if (this.state.isValidUser) {
            this.props.setUser(user)
        } else console.log('username not found!')
    }

    handleChange = (event) => {
        event.preventDefault();
        const stateProp = event.target.getAttribute('data_key');
        this.checkUsername(event.target.value, this.state.users)
        this.setState({
            [stateProp]: event.target.value
        });
    };
    
    render() {
        return (
            <div>
                <h4>Account Register and Login will go here...</h4>
                <form>
                    <label>
                        Username: 
                        <input type="text" data_key="user" onChange={this.handleChange}></input>
                        <button type="submit" onClick={this.handleSubmit}>Login!</button>
                    </label>
                </form>
            </div>
        );
    };
};

export default Account;