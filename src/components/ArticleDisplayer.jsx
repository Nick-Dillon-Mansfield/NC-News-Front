import React, {Component} from 'react';
import {Link} from '@reach/router'
import DeleteButton from './DeleteButton';
import '../index.css';

class ArticleDisplayer extends Component {
    
    state = {
        hideArticle: false, 
    }

    hideItem = () => {
        this.setState({
                hideArticle: true,
        })
    }

    render() {
        const {title, topic, author, created_at, comment_count, article_id, votes, updateArticleCounter} = this.props;
        if (this.state.hideArticle) {
            return <div>
                    <h3 className="deleted">Article deleted :O</h3>
                </div>
        }
        return <div key={article_id}>
        =====================
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
            {author === this.props.user && <DeleteButton id={article_id} url={'/articles'} hideItem={this.hideItem} updateArticleCounter={updateArticleCounter} type="Article"/>}
        </div>
    }
}

export default ArticleDisplayer;