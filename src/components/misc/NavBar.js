import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { withAuthConsumer } from '../../contexts/AuthStore'


class NavBar extends Component {
 
    handleLogout = () => {
                
                this.props.onUserChange({})
                this.props.history.push('/login')
           
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                <Link className="navbar-brand" to="https://www.laliga.es/">
                    <img src="https://files.laliga.es/seccion_logos/laliga-h-negativo-600x600_2018.jpg" width="30" height="30" alt="logo_LaLiga"/>
                </Link>
                <ul className="navbar-nav my-2 my-lg-0">
                        {!isAuthenticated() &&
                            <Fragment>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/register">Register</NavLink>
                                </li>
                            </Fragment>
                        }  
                        {isAuthenticated() &&
                            <Fragment>
                                <div className="nav-item text-center align-middle mr-3">
                                <img className="img-fluid rounded-circle" width="50" height="50" src={user.avatar || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"}/>
                                <span className="nav-link active" >{user.name}</span>
                                </div>
                                <li className="nav-item">
                                <Link className="nav-link"  onClick={this.handleLogout}><i className='fa fa-power-off fa-3x'></i></Link>
                                </li>
                            </Fragment>
                        }  
                    </ul>
               
            </nav>
        );
    }
}

// export default NavBar;

export default withRouter(withAuthConsumer(NavBar));