import React, {Component} from 'react';
import DeleteButton from './DeleteButton';
import VoteButtons from './VoteButtons';
import '../index.css';

class ArticleDisplayer extends Component {
    
    state = {
        commentsToHide: [], 
    }

    updateCommentsToHide = (deletedCommentID) => {
        if (this.state.commentsToHide && this.state.commentsToHide.length > 0) {
            this.setState(prevState => ({
                commentsToHide: [deletedCommentID, ...prevState.commentsToHide]
            }))
        } else {
            this.setState({
                commentsToHide: [deletedCommentID]
            })
        }
    }

    render() {
        const {user, author, body, comment_id, created_at, votes} = this.props.comment;
        const {updateVotesToDisplay} = this.props;
        if (this.state.commentsToHide.includes(comment_id)) {
            return <div>
                    <h3 className="deleted">Comment deleted!</h3>
                </div>
        }
        const url = `/articles`
        return <div key={comment_id}>
            --------------
            <p>{body}</p>
            <h6>{author}   ||   {created_at}   ||   Votes: {votes}</h6>
            <VoteButtons user={this.props.user} type="Comment" id={comment_id} updateVotesToDisplay={updateVotesToDisplay}/>
            {author === user && <DeleteButton updateCommentCounter={this.props.updateCommentCounter} article_id={this.props.article_id} id={comment_id} updateCommentsToHide={this.updateCommentsToHide} type="Comment" url={url}/>}
        </div>
    }
}



export default ArticleDisplayer;