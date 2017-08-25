/**
 * Created by plarboul on 05/04/2016.
 */


import React, { PropTypes, Component } from 'react'

const HeaderView = ({title}) => {
    return (
        <div>
            <h1> {title} </h1>
        </div>
    )
};

const Header = (props) => {

    return (
       <HeaderView title={props.title} />
    )
};


export default Header;