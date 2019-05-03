import React from 'react';
import '../../App.css'
import '../../index.css'
import logo from '../../cssFiles/northcodersNwithNoBackground.png'

const Header = (props) => {

    return (
        <div id="ncNews">
            <h1 id="ncNewsText">NC News!</h1>
            <img src={logo} id="ncLogo"/>
        </div>
    )
}

export default Header;

