import React, {Component} from 'react';
import {deletePost} from '../api'
import {navigate} from '@reach/router'

class DeleteButton extends Component {
    
    handleClick = (event) => {
        const {type, id, url, hideItem} = this.props;
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete this? Once you do, you cannot undo it!')) {
            deletePost(type, id)
            .then(() => {
                if (type === "Comment") {
                    const {updateCommentCounter} = this.props
                    hideItem();
                    updateCommentCounter(-1)
                } else if (type === "Article") {
                    const {updateArticleCounter} = this.props;
                    hideItem()
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
        const {type} = this.props
        return (
            <button onClick={this.handleClick}>Delete {type} :(</button>
        );
    };
};

export default DeleteButton;