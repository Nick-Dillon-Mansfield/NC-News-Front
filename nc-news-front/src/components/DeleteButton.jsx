import React, {Component} from 'react';
import {deletePost} from '../api'
import {navigate} from '@reach/router'

class DeleteButton extends Component {
    
    state = {
        type: null,
        id: null,
        url: null,
        article_id: null,
        deleted: false,
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
        const {type, id, url, article_id} = this.state;
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete this? Once you do, you cannot undo it!')) {
            deletePost(type, id)
            .then((deleteObj) => {
                if (type === "Comment") {
                    const {setCommentDeleted} = this.props
                    setCommentDeleted();
                    this.setState({ deleted: true });
                } else if (type === "Article") {
                    const {setArticleDeleted} = this.props;
                    setArticleDeleted();
                    this.setState({ deleted: true });
                } else {
                    console.log(deleteObj)
                    console.log(type + " + " + url)
                    navigate(url, {
                        state: {articleDeleted: true} // TO FIX - DOESN'T NAVIGATE!!!
                    })
                }
            })
            .catch(err => {
                console.dir(err)
            });
        };
    };
    
    render() {
        const {type, deleted} = this.state
        return (
            <button disabled={deleted} onClick={this.handleClick}>Delete {type} :(</button>
        );
    };
};

export default DeleteButton;