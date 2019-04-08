import React, {Component} from 'react';
import {Link} from '@reach/router'
import DeleteButton from './DeleteButton';
import '../index.css';

class ArticleDisplayer extends Component {
    
    state = {
        articlesToHide: [], 
    }

    updateArticlesToHide = (deletedArticleID) => {
        if (this.state.articlesToHide && this.state.articlesToHide.length > 0) {
            this.setState(prevState => ({
                articlesToHide: [deletedArticleID, ...prevState.articlesToHide]
            }))
        } else {
            this.setState({
                articlesToHide: [deletedArticleID]
            })
        }
    }

    render() {
        const {title, topic, author, created_at, comment_count, article_id, votes, updateArticleCounter} = this.props;
        if (this.state.articlesToHide.includes(article_id)) {
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
            {author === this.props.user && <DeleteButton id={article_id} url={'/articles'} updateArticlesToHide={this.updateArticlesToHide} updateArticleCounter={updateArticleCounter} type="Article"/>}
        </div>
    }
}

export default ArticleDisplayer;