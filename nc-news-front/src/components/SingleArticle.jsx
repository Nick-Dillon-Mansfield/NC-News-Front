import React, { Component } from 'react';
import axios from "axios";

class SingleArticle extends Component {
    state = {
        id: this.props.article_id,
        article: null,
        comments: null,
    }
    
    componentDidMount() {
        const url = `https://ncnews-api.herokuapp.com/api/articles/${this.state.id}`
        axios.get(url)
            .then(({data: {article}}) => {
                this.setState({article})
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
        </div>
        ) 
        else {
            return <p>loading...</p>
        }
    }
}

export default SingleArticle;