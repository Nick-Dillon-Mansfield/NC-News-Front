import React, {Component} from 'react';
import {deletePost} from '../api'

const DeleteButton = (props) => {
    
    const handleClick = (event) => {
        const {type, id} = props;
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete this? Once you do, you cannot undo it!')) {
            deletePost(type, id)
                .then(() => {
                   alert('Deleted!') 
                })
        }
    } 

    return (
        <button onClick={handleClick}>Delete {props.type} :(</button>
    )
}

export default DeleteButton;