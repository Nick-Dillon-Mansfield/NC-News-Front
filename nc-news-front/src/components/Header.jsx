import React from 'react';

const Header = (props) => {
    return (
        <div>
            <h1>NC News!</h1>
            {props.user && <h5>Logged in as {props.user}</h5>}
        </div>
    )
}

export default Header;