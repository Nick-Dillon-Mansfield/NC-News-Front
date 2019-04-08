import React, { Component } from 'react';
import {navigate} from '@reach/router'
import Comments from './Comments';
import "../index.css";
import {fetchSingleArticle} from '../api'
import DeleteButton from './DeleteButton'
import VoteButtons from './VoteButtons'

class SingleArticle extends Component {
    state = {
        article: null,
        showComments: false,
        votes: 0,
        comments: 0
    }
    
    componentDidMount() {
        fetchSingleArticle(this.props.article_id)
            .then((article) => {
                this.setState({
                    article,
                    votes: article.votes,
                    comments: article.comment_count
                })
            })
            .catch(err => {
                navigate('/Page404')
            }) 
    }


    handleClick = (event) => {
        event.preventDefault()
        this.setState({
            showComments: !this.state.showComments
        })
    }

    updateVotesToDisplay = (newVote) => {
        this.setState(prevState => ({
            votes: +prevState.votes + +newVote
        }))
    }
    
    updateCommentCounter = (newCommentCount) => {
            this.setState(prevState => ({
            comments: +prevState.comments + +newCommentCount
        }))
    }

    render(){
        const {author, body, created_at, title, topic, article_id} = this.state.article ? this.state.article : '';
        if (this.state.article) 
        return ( 
            <div>
            {this.props.location.state && this.props.location.state.newArticle && <h3 className="newPost">Thank you for posting - here is your article!</h3>}
            <h2>{title}</h2>
            <h4>by {author}</h4>
            <p>{body}</p>
            <h6>Posted to '{topic}' on {created_at}</h6>
            <h4>Votes: {this.state.votes}</h4> <br/>
            <VoteButtons user={this.props.user} type="Your Article" id={article_id} updateVotesToDisplay={this.updateVotesToDisplay}/>
            {author === this.props.user && <DeleteButton id={article_id} url='/articles' type="Your Article"/>}
            <h4>Comments: {this.state.comments}</h4> <br/>
            {this.state.comments > 0 ? <button onClick={this.handleClick}>Show/Hide Comments Section</button> : null}
            {this.state.showComments && <Comments updateCommentCounter={this.updateCommentCounter} user={this.props.user} article_id={this.props.article_id}/>}
        </div>
        ) 
        else {
            return <p>loading...</p>
        }
    }
}

export default SingleArticle;