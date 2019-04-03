import React, { Component } from 'react';
import { fetchComments } from '../api';
import CommentPoster from './CommentPoster'
import DeleteButton from './DeleteButton';

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
        console.log(this.props)
        const comments = this.state.comments;
        return (
            <div>
            <CommentPoster user={this.props.user} article_id={this.props.article_id} updateCommentsToDisplay={this.updateCommentsToDisplay}/>
            {comments ? 
                comments.map(comment => {
                    const {author, body, comment_id, created_at} = comment;
                    const url = `http://localhost:3000/articles/`
                    return <div key={comment_id}>
                        --------------
                        <p>{body}</p>
                        <h6>{author}   ||   {created_at} </h6>
                        {author === this.props.user && <DeleteButton article_id={this.props.article_id} id={comment_id} type="Comment" url={url}/>}
                    </div>
                }) :
            <p>No comments to show! :O</p>
            }
            </div>
        )
    }
}

export default Comments;