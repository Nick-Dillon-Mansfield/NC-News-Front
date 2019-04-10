import React, {Component} from 'react';
import {voteOnPost} from '../../api';

class VoteButtons extends Component {

    state = {
        displayLoginMsg: false,
        opinion: 0
    }

    componentDidMount() {
        this.setState({
            displayLoginMsg: false
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            this.setState({
                displayLoginMsg: false
            })
        }
    }

    handleClick = (event) => {
        const {type, id, updateVotesToDisplay} = this.props;
        const increment = +event.target.value
        event.preventDefault();
        const {user} = this.props;
        if (user) {
            updateVotesToDisplay(increment, id);
            voteOnPost(type, id, increment)
            .then(() => {
                this.setState(prevState => ({
                    opinion: prevState.opinion + increment
                }))
            })
        } else {
            this.setState({
                displayLoginMsg: true
            })
        }
    }

    render() {
        const {displayLoginMsg, opinion} = this.state;
        return <div>
            <button onClick={this.handleClick} value={1} disabled={opinion===1}>Like</button>
            <button onClick={this.handleClick} value={-1} disabled={opinion===-1}>Dislike</button>
            {displayLoginMsg && <h5>You must login to vote!</h5>}
        </div>
    }
}

export default VoteButtons;