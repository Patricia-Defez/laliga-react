import React, { Fragment, Component } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

import { withAuthConsumer } from '../../contexts/AuthStore'


class NavBar extends Component {
 
    handleLogout = () => {
                
                this.props.onUserChange({})
                this.props.history.push('/login')
           
    }


    render() {
        const { isAuthenticated, user} = this.props
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
                <a className="navbar-brand" href="https://www.laliga.es/" target="_blank">
                    <img src="https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png" width="100" height="100" alt="logo_LaLiga"/>
                </a>

                <div className="collapse navbar-collapse " id="mainNavbar">
                <ul className="navbar-nav my-2 my-lg-0">
                        {!isAuthenticated() &&
                            <Fragment>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/users">Usuarios</NavLink>
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
                    </div>
            </nav>
        );
    }
}

// export default NavBar;

export default withRouter(withAuthConsumer(NavBar));