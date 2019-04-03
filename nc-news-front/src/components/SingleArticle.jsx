import React, { Component } from 'react';
import Comments from './Comments';
import CommentPoster from './CommentPoster'
import axios from "axios";
import "../index.css";
import {fetchSingleArticle} from '../api'

class SingleArticle extends Component {
    state = {
        article: null,
        showComments: false,
    }
    
    componentDidMount() {
        fetchSingleArticle(this.props.article_id)
            .then((article) => {
                this.setState({
                    article
                })
            })
    }

    handleClick = (event) => {
        event.preventDefault()
        this.setState({
            showComments: !this.state.showComments
        })
    }

    render(){
        const {author, body, comment_count, created_at, title, topic, votes} = this.state.article ? this.state.article : '';
        if (this.state.article) 
        return ( 
            <div>
            {this.props.location.state && this.props.location.state.newArticle && <h3 className="newPost">Thank you for posting - here is your article!</h3>}
            <h2>{title}</h2>
            <h4>by {author}</h4>
            <p>{body}</p>
            <h6>Posted to '{topic}' on {created_at}</h6>
            <h4>Votes: {votes}</h4> <br/>
            <h4>Comments: {comment_count}</h4> <br/>
            <button onClick={this.handleClick}>Show/Hide Comments</button>
            {this.state.showComments && <Comments user={this.props.user} article_id={this.props.article_id}/>}
        </div>
        ) 
        else {
            return <p>loading...</p>
        }
    }
}

export default SingleArticle;