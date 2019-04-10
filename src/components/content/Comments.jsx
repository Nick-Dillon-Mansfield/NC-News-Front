import React, { Component } from 'react';
import { fetchComments } from '../../api';
import CommentPoster from '../posters/CommentPoster'
import PostsDisplayer from '../utilities/PostsDisplayer';
import '../../index.css'

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
        const {user, updateCounter, article_id} = this.props
        return (
            <div>
            <CommentPoster user={user} article_id={article_id} updateCommentsToDisplay={this.updateCommentsToDisplay} updateCounter={updateCounter}/>
            {comments ? 
                comments.map(comment => {
                    return <PostsDisplayer type="Comment" user={user} key={comment.comment_id} updateCounter={updateCounter} updateVotesToDisplay={this.updateVotesToDisplay} comment={comment} />
                }) :
            <p>No comments to show! :O</p>
            }
            </div>
        )
    }
}


export default Comments;