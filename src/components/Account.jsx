import React, {Component} from 'react';
import {fetchUsers} from '../api'

class Account extends Component {
    
    state = {
        users: null,
        user: null,
        isExistingUser: null,
        isNotExistingUser: null,
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
        this.setState({
            isExistingUser: existingUsername
        })
    }

    handleSubmit = (event) => {
        const {user} = this.state;
        event.preventDefault();
        if (this.state.isExistingUser) {
            this.props.setUser(user)
        } else {
            alert('Sorry, cannot find that user!')
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const stateProp = event.target.getAttribute('data_key');
        this.checkUsername(event.target.value, this.state.users)
        this.setState({
            [stateProp]: event.target.value
        });
    };

    handleLogout = (event) => {
        event.preventDefault();
        this.props.setUser(null);
    }
    
    render() {
        const {user} = this.props;
        return (
            <div className="NavBar">
                {user && <h5 className="NavBar container">Welcome, {user}</h5>}
                {user ? 
                <button type="submit" onClick={this.handleLogout}>Log out!</button> : 
                <form>
                    <label>
                        Username: 
                        <input type="text" data_key="user" onChange={this.handleChange} placeholder="e.g. tickle122"></input>
                        <button type="submit" onClick={this.handleSubmit}>Login!</button>
                    </label>
                </form>
            }
            </div>
        );
    };
};

export default Account;