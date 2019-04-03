import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from '@reach/router';

const Comments = (props) => {
    return (
        <div>
            {props.comments ? 
                props.comments.map(comment => {
                    return <div key={comment.comment_id}>
                        --------------
                        <p>{comment.body}</p>
                        <h6>{comment.author}   ||   {comment.created_at} </h6>
                    </div>
                }) :
            <p>No comments to show! :O</p>
            }
        </div>
    )
}

export default Comments;