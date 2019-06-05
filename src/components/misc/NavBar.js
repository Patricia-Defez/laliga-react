import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <a className="navbar-brand" href="https://www.laliga.es/" target="_blank">
                <img src="https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png" width="100" height="100" alt="logo_LaLiga"/>
            </a>

            <div className="collapse navbar-collapse " id="mainNavbar">
            <ul className="navbar-nav my-2 my-lg-0">                                  
                            <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/users">Usuarios</NavLink>
                            </li>           
                </ul>
                </div>
        </nav>
        );
    }
}

export default NavBar;