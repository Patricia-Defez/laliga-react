import React, { Component } from 'react'
import { createUser } from '../services/UsersService'
import { Link } from 'react-router-dom'


const validations = {
    name: (value) => {
        let message;
        if (!value) {
            message = 'El nombre es un campo necesario';
        }
        return message;
    },
    job: (value) => {
        let message;
        if (!value) {
            message = 'El empleo es un campo necesario';
        }
        return message;
    }
}

class CreateUser extends Component {

    state = {
        user: {
            name: '',
            job: ''
        },
        isRegistered: false,
        errors: true,
        touch: {}
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            },
            errors: false
        })
        
    }

    handleBlur = (e) => {
        const { name } = e.target;
        this.setState({
            touch: {
                ...this.state.touch,
                [name]: true
            }
        })
    }

    handleSubmit = (e) => {
        
        console.log(this.state.user)
        e.preventDefault();
        if(this.isValid()) {
            this.setState({ user: { ...this.state.user} });
            createUser(this.state.user)
                .then(
                    (user) => {
                        console.log(user)
                        this.setState({ isRegistered: true });
                        console.log(user)
                    }, 
                    (error) => {
                        const { message, errors } = error.response.data;
                        this.setState({
                            errors: {
                                ...errors,
                                job: !errors && message
                            },
                            touch: {
                                ...errors,
                                job: !errors && message
     
                            }
                        })
                    }
                )
            this.setState({
                user: {
                    name: '',
                    job: ''
                },
                isRegistered: false,
                errors: {},
                touch: {},
            })
        }
    }

    isValid = () => {
        return !Object.keys(this.state.user)
        .some(attr => this.state.errors[attr])
    }

    render() {
        const { user, errors, touch } = this.state;
        return (
            <div className = "row justify-content-center mt-5 ">
            <div className="box mx-auto col-sm-4 mt-5">

                <div className="">
                    <h3>Usuario</h3>
                    <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" name="name" className={`form-control ${touch.name && errors.name && 'is-invalid'}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={user.name}  />
                        </div>

                        <div className="form-group">
                            <label>Empleo</label>
                            <input type="text" name="job" className={`form-control ${touch.job && errors.job && 'is-invalid'}`}
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                value={user.job}  />
                             {touch && errors && (
                                <p className="help is-danger">Los campos son obligatorios</p>
                            )}  
                            </div>

                        <div className="col-6 pt-4">
                        <button className="btn btn-primary" form="profile-form" type="submit" disabled={!this.isValid()}>Crear Usuario</button>
                        </div>

                    </form>
                </div>
                <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a> 
                
            </div>
        </div>

        );
    }
}    
export default CreateUser