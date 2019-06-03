import React, { Component } from 'react'
import { getUser } from '../services/UsersService'
import { Link, withRouter } from 'react-router-dom';

class User extends Component {

    state = {
        user: {
            id: '',
            avatar: '',
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount() {
        // console.log(data)
        const { match: { params } } = this.props;
        console.log(this.props)
        
        console.log(params)
        getUser(params.id)
            .then(
                (user) => {
                    console.log(user)
                    this.setState({ user: {...user.data} })
                    console.log(this.state.user)
                },
                (error) => console.error(error)

            )

    }

    render() {
        return (
            <div className="row justify-content-center mt-5 pl-2">
                <div className="box mx-auto col-sm-4 mt-5">
                    <div className="media ">
                        <div className="media-left mr-5">
                            <figure className="image is-64x64">
                                <img src={this.state.user.avatar || "http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png"} alt="Generic placeholder image" />
                            </figure>
                        </div>
                        <div className="media-body">
                            <h5 className="mt-0">Nombre: {this.state.user.first_name}</h5>
                            <h5 className="mt-0">Apellido: {this.state.user.last_name}</h5>
                            <p>email: {this.state.user.email}</p>

                        </div>

                    </div>
                    <div>
                        <Link className="btn btn-sm btn-primary" to={`/users/${this.state.user.id}/edit`}>
                        Editar Usuario
                        </Link>
                    </div>
                    <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a>
                    
                </div>
            </div>

        )

    }

}

export default User;