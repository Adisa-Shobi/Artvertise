import { Component } from "react";
import { MenuData } from "./MenuData";
import './NavbarStyles.css';

import React from 'react'
import { Link } from "react-router-dom";


class Navbar extends Component{
    state = {clicked: false};

    handleClick =() => {
        this.setState({clicked: !this.state.clicked})
    }

    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="logo">Artvertise <i className="fa-brands fa-artstation"></i> </h1>
                <div className="menu-icons" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    {MenuData.map((item, index) => {
                        return(
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>
                                    <i className={item.icon}></i>{item.title}
                                </Link>
                            </li>
                        )
                    })}
                    
                </ul>
            </nav>
        )
    }
}

export default Navbar;