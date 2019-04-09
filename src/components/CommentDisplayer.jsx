import React, {Component} from 'react';
import DeleteButton from './DeleteButton';
import VoteButtons from './VoteButtons';
import '../index.css';

class ArticleDisplayer extends Component {
    
    state = {
        hideComment: false, 
    }

    hideItem = () => {
        this.setState({
            hideComment: true
        })
    }

    render() {
        const {author, body, comment_id, created_at, votes} = this.props.comment;
        const {user, updateVotesToDisplay, updateCounter} = this.props;
        const {hideComment} = this.state;
        if (hideComment) {
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
            {author === user && <DeleteButton updateCounter={updateCounter} id={comment_id} hideItem={this.hideItem} type="Comment" url={url}/>}
        </div>
    }
}



export default ArticleDisplayer;