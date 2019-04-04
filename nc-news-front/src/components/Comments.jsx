import React, { Component } from 'react';
import { fetchComments } from '../api';
import CommentPoster from './CommentPoster'
import DeleteButton from './DeleteButton';
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

    setCommentDeleted = (id) => {
        this.setState({
            commentDeleted: true,
        })
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
        const setCommentDeleted = this.setCommentDeleted;
        return (
            <div>
            <CommentPoster user={this.props.user} article_id={this.props.article_id} updateCommentsToDisplay={this.updateCommentsToDisplay}/>
            {this.state.commentDeleted && <h3 className="deleted">Comment deleted! This will disappear when you refresh the page...</h3>}
            {comments ? 
                comments.map(comment => {
                    const {author, body, comment_id, created_at} = comment;
                    const url = `http://localhost:3000/articles/`
                    return <div key={comment_id}>
                        --------------
                        <p>{body}</p>
                        <h6>{author}   ||   {created_at} </h6>
                        {author === this.props.user && <DeleteButton article_id={this.props.article_id} id={comment_id} setCommentDeleted={setCommentDeleted} type="Comment" url={url}/>}
                    </div>
                }) :
            <p>No comments to show! :O</p>
            }
            </div>
        )
    }
}

export default Comments;