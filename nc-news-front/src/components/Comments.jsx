import React, { Component } from 'react';
import { fetchComments } from '../api';
import CommentPoster from './CommentPoster'
// import axios from 'axios';
// import { Link } from '@reach/router';

class Comments extends Component {
    
    state = {
        comments: [],
    }
    
    componentDidMount() {
        const article_id = this.props.article_id;
        fetchComments(article_id)
        .then((comments) => {
            this.setState({
                comments
            })
        })
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.comments !== this.state.comments) {
            this.setState({comments: this.state.comments})
        }
    }

    updateCommentsToDisplay = (newComment) => {
        if (this.state.comments && this.state.comments.length > 0) {
            this.setState(prevState => ({
                comments: [newComment, ...prevState.comments]
            }))
        } else {
            this.setState({
                comments: [newComment]
            })
        }
    }

    render() {
        const comments = this.state.comments;
        return (
            <div>
            <CommentPoster user={this.props.user} article_id={this.props.article_id} updateCommentsToDisplay={this.updateCommentsToDisplay}/>
            {comments ? 
                comments.map(comment => {
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
}

export default Comments;