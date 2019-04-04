import React, {Component} from 'react';
import {deletePost} from '../api'
import {navigate} from '@reach/router'

class DeleteButton extends Component {
    
    state = {
        type: null,
        id: null,
        url: null,
        article_id: null,
    }

    componentDidMount() {
        const {type, id, url, article_id} = this.props;
        this.setState({
            type,
            id,
            url,
            article_id
        })
    }
    
    handleClick = (event) => {
        const {type, id, url} = this.state;
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete this? Once you do, you cannot undo it!')) {
            deletePost(type, id)
            .then(() => {
                if (type === "Comment") {
                    const {updateCommentsToHide, updateCommentCounter} = this.props
                    updateCommentsToHide(id);
                    updateCommentCounter(-1)
                } else if (type === "Article") {
                    const {updateArticlesToHide, updateArticleCounter} = this.props;
                    updateArticlesToHide(id)
                    updateArticleCounter(-1)
                } else {
                    navigate(url, {
                        state: {articleDeleted: true}
                    })
                }
            })
            .catch(err => {
                console.dir(err)
            });
        };
    };
    
    render() {
        const {type} = this.state
        return (
            <button onClick={this.handleClick}>Delete {type} :(</button>
        );
    };
};

export default DeleteButton;