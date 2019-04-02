import React, { Component } from 'react';
import Comments from './Comments';
import axios from "axios";

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
            <h2>{title}</h2>
            <h4>by {author}</h4>
            <p>{body}</p>
            <h6>Posted to '{topic}' on {created_at}</h6>
            <h4>Comments: {comment_count}</h4> <br/>
            <button onClick={this.handleClick}>Show/Hide Comments</button>
            {this.state.showComments && <Comments comments={this.state.comments}/>}
        </div>
        ) 
        else {
            return <p>loading...</p>
        }
    }
}

export default SingleArticle;