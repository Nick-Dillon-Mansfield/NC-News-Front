import React, { Component } from 'react';
import { fetchComments } from '../api';
import CommentPoster from './CommentPoster'
import CommentDisplayer from './CommentDisplayer'
import '../index.css'

class Comments extends Component {
    
    state = {
        comments: [],
        commentDeleted: false,
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

    updateVotesToDisplay = (newVote, id) => {
        const updatedComments = this.state.comments.map(comment => {
            if (comment.comment_id === id) return {...comment, votes: comment.votes+newVote}
            return comment
        })
        this.setState({
            comments: updatedComments
        })
    }

    render() {
        const comments = this.state.comments;
        return (
            <div>
            <CommentPoster user={this.props.user} article_id={this.props.article_id} updateCommentsToDisplay={this.updateCommentsToDisplay}/>
            {this.state.commentDeleted && <h3 className="deleted">Comment deleted! This will disappear when you refresh the page...</h3>}
            {comments ? 
                comments.map(comment => {
                    const {author, body, comment_id, created_at, votes} = comment;
                    return <CommentDisplayer updateVotesToDisplay={this.updateVotesToDisplay} user={this.props.user} article_id={this.props.article_id} author={author} body={body} comment_id={comment_id} created_at={created_at} votes={votes} />
                }) :
            <p>No comments to show! :O</p>
            }
            </div>
        )
    }
}


export default Comments;