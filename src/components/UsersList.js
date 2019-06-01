import React, { Component } from 'react';
import { list } from '../services/UsersService'
import { Link } from 'react-router-dom'


class UsersList extends Component {
    
    state = {
        users: [],
        error: null
    }

    componentDidMount = () => {
        list({per_page:5,page:1})
            .then(response => {
                this.setState({ users: response.data })
                console.log(response)
            });
           
        
        
    }

    render = () => {
        return (
            
            <div className="box mx-auto mt-5">
                <div className="container">
                    <h1>Listado de Usuarios</h1>
                   

                    <table className="table">
                            <thead>
                                <tr className="text-center align-middle">
                                    <th scope="col">#</th>
                                    <th scope="col"><i className="fa fa-users fa-lg"></i></th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">email</th>

                                </tr>
                            </thead>
                            <tbody>

                                {this.state.users.map((user, index) => (
                                    <tr {...user} key={index} className="text-center align-middle">
                                    <th scope="row">{index + 1}</th>
                                    <td><img className="img-fluid rounded-circle" width="50" height="50" src={user.avatar || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"}/></td>
                                    <td><Link to={`/users/${user.id}`}>{user.first_name} </Link></td>
                                    {/* <td>{user.first_name}</td> */}
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>                                   
                        </table>
                    </div>               
            </div>

        )

    }
}

export default UsersList;