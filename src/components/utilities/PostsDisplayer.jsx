import React, {Component} from 'react';
import {Link} from '@reach/router'
import DeleteButton from './DeleteButton';
import VoteButtons from './VoteButtons';
import '../../index.css';

class PostsDisplayer extends Component {
    
    state = {
        hideItem: false, 
    }

    hideItem = () => {
        this.setState({
                hideItem: true,
        })
    }

    render() {
        const {updateCounter, type} = this.props;
        if (this.state.hideItem) {
            return <div>
                    <h3 className="deleted" className="postedTopic">{type} deleted :O</h3>
                </div>
        }
        if (type === "Article") {
            const {title, topic, author, created_at, comment_count, article_id, votes} = this.props.article;
            return <div key={article_id} className="postedArticle">
            <p>
                Title: {title} <br/>
                Topic: {topic} <br/>
                Author: {author} <br/>
                Published: {created_at} <br/>
        ------
            </p>
            <h6>Votes: {votes}  ||  Comments: {comment_count}</h6>
            <Link to={`/articles/${article_id}`} key={`${article_id}`}>
                Open Article
            </Link><br />
            {author === this.props.user && <DeleteButton id={article_id} url={'/articles'} hideItem={this.hideItem} updateCounter={updateCounter} type="Article"/>}
        </div>
        }
        else {
            const {author, body, comment_id, created_at, votes} = this.props.comment;
            const {user, updateVotesToDisplay, updateCounter} = this.props;
            const url = `/articles`
            return <div key={comment_id} className="postedItem">
                --------------
                <p>{body}</p>
                <h6>{author}   ||   {created_at}   ||   Votes: {votes}</h6>
                <VoteButtons user={this.props.user} type="Comment" id={comment_id} updateVotesToDisplay={updateVotesToDisplay}/>
                {author === user && <DeleteButton updateCounter={updateCounter} id={comment_id} hideItem={this.hideItem} type="Comment" url={url}/>}
            </div>
        }
    }
}

export default PostsDisplayer;