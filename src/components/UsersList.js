import React, { Component } from 'react';
import { list } from '../services/UsersService'
import { deleteUser } from '../services/UsersService'
import { Link } from 'react-router-dom'


class UsersList extends Component {
    
    state = {
        users: [],
        error: null,
        currentPage: 1,
        usersPerPage: 5
    }

    componentDidMount = () => {
        list({per_page:12,page:1})
            .then(response => {
                this.setState({ users: response.data })
                console.log(response)
            });      
    }
  

    pagination = (e) => {
        console.log(e.target.id)
        this.setState ({
            currentPage: e.target.id
        })        
    }

    handleDeleteUser = (id) => {
        deleteUser(id) 
            .then((user) => {
                const newUsers = [...this.state.users]
                    .filter(user => user.id !== id);
                this.setState({
                    users: newUsers
                })
            })

    }

    render = () => {

        const { users, currentPage, usersPerPage } = this.state;

 

        const indexOfLastAll = currentPage * usersPerPage;

        const indexOfFirstAll = indexOfLastAll - usersPerPage;

        const currentUsers = users.slice(indexOfFirstAll, indexOfLastAll)

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

                                {currentUsers.map((user, index) => (
                                    <tr {...user} key={index} className="text-center align-middle">
                                    <th scope="row">{index + 1}</th>
                                    <td><img className="img-fluid rounded-circle" width="50" height="50" src={user.avatar || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"}/></td>
                                    <td><Link to={`/users/${user.id}`}>{user.first_name} </Link></td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td><i className="mr-2 fa fa-times text-danger fa-lg mt-3" 
                                    onClick={this.handleDeleteUser.bind(this, user.id)}></i></td>
                                    </tr>
                                    
                                ))}
                            </tbody>                                   
                        </table>
                        <div className="mt-3">          
                        <Link className="btn btn-sm btn-primary float-right" to={`/users/create`}>Crear Usuario</Link>
                        </div>
                        <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            
                            <li className="page-item"><button className="page-link" id="1" onClick={this.pagination}>1</button></li>
                            <li className="page-item"><button className="page-link" id="2" onClick={this.pagination}>2</button></li>
                            <li className="page-item"><button className="page-link" id="3" onClick={this.pagination}>3</button></li>
                            
                           
                        </ul>
                        </nav>  
                    </div> 
                           
            </div>

        )

    }
}

export default UsersList;