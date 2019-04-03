import React, { Component } from 'react';
import Comments from './Comments';
import CommentPoster from './CommentPoster'
import axios from "axios";
import "../index.css";

class SingleArticle extends Component {
    state = {
        article: null,
        comments: null,
        showComments: false,
    }
    
    componentDidMount() {
        const articleURL = `https://ncnews-api.herokuapp.com/api/articles/${this.props.article_id}`
        const commentsURL = `https://ncnews-api.herokuapp.com/api/articles/${this.props.article_id}/comments`
        const articleData = axios.get(articleURL);
        const commentsData = axios.get(commentsURL);
        Promise.all([articleData, commentsData])
            .then((info) => {
                this.setState({
                    article: info[0].data.article,
                    comments: info[1].data.comments,
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
            <CommentPoster user={this.props.user} article_id={this.props.article_id}/>
            {this.state.showComments && <Comments comments={this.state.comments}/>}
        </div>
        ) 
        else {
            return <p>loading...</p>
        }
    }
}

export default SingleArticle;