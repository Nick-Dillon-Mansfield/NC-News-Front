import React, {Component} from 'react';
import {deletePost} from '../api'
import {navigate} from '@reach/router'

const DeleteButton = (props) => {
    
    const {type, id, url, article_id} = props;

    const handleClick = (event) => {
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete this? Once you do, you cannot undo it!')) {
            deletePost(type, id)
                .then((deleteObj) => {
                    console.log(deleteObj)
                        if (type === "Comment") {
                            navigate(`${url}${article_id}`)
                    } else {

                    }
                   alert(`${type} Deleted!`) 
                })
        }
    } 

    return (
        <button onClick={handleClick}>Delete {props.type} :(</button>
    )
}

export default DeleteButton;