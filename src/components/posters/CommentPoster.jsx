import React, {Component} from 'react';
import { postComment } from '../../api';
import '../../index.css';

class CommentPoster extends Component {
    
    state = {
        body: null,
        showCommentBox: false,
        comment: null,
    }

    toggleCommentBox = () => {
        this.setState({
            showCommentBox: !this.state.showCommentBox
        })
    }
    
    handleChange = (event) => {
        event.preventDefault()
        const body = event.target.value
        this.setState({
            body
        })
    }
    
    handleSubmit = (event) => {
        const {user, article_id, updateCommentsToDisplay, updateCounter} = this.props;
        const {body} = this.state;
        event.preventDefault()
        updateCounter(1)
        postComment(user, body, article_id)
        .then(comment => {
            updateCommentsToDisplay(comment)
            this.setState({
                comment
            })
        })
    }



    render() {
        const comment = this.state.comment;
        return (
            <div>
                <button onClick={this.toggleCommentBox}>Post comment</button>
                {this.state.showCommentBox ? 
                    this.props.user ?
                        <form>
                            <label>
                                Comment: 
                                <textarea data_key="body" onChange={this.handleChange}/>
                                <button type="submit" onClick={this.handleSubmit}>Post!</button>
                            </label>
                        </form> :
                        <h3>You must login to post a comment!</h3>    
                    : null
                }
                {comment && <div className="newComment">
                    <p>Thank you for posting! Here is your comment: </p>
                    <p>{comment.body}</p>
                        <h6>{comment.author}   ||   {comment.created_at} </h6>
                </div>
                }
            </div>
        )
    }
}

export default CommentPoster;