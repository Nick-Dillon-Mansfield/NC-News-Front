import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class Comments extends Component {
    state = {

    }

    render() {
        return (
            <div>
                {this.props.comments.map(comment => {
                    return <div key={comment.comment_id}>
                        --------------
                        <p>{comment.body}</p>
                        <h6>{comment.author}   ||   {comment.created_at} </h6>
                    </div>
                })}
            </div>
        )
    }
}

export default Comments;