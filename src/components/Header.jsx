import React from 'react';
import '../App.css'

const Header = (props) => {

    return (
        <div>
            <h1 className="NavBar container">NC News!</h1>
            {props.user && <h5 className="NavBar container">Welcome, {props.user}</h5>}
        </div>
    )
}

export default Header;

