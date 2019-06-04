import React, { Component } from 'react'
import { getUser } from '../services/UsersService'
import { updateUser } from '../services/UsersService'
import FormField from './FormField'



const validations = {
    name: v => v.length > 0,
    job: v => v.length > 0
}

class UpdateUser extends Component {

    state = {
        user: {
            id: '',
            avatar: '',
            first_name: '',
            last_name: '',
            email: '',
            
        },
        update: {
            name: '',
            job: '',
        },
       
        errors: {
            name: true,
            job: true
        },
        touch: {}
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const error = {
            [name]: !validations[e.target.name]
        }
        this.setState({
            update: {
                ...this.state.update,
                [name]: value
            },
            errors: {
                ...this.state.errors,
                ...error
            }
        })
        
    }

    handleBlur = (e) => {
        this.setState({
            touch: {
                ...this.state.touch,
                [e.target.name]: true
            }
        })
    }

    handleSubmit = (e) => {
        
        console.log(this.state.update)
        e.preventDefault();
        if(this.isValid()) {
            
            updateUser(this.state.user.id, this.state.update)
                .then(
                    (update) => {
                        console.log(update)
                        this.setState({ update: {...this.state.update, ...update} });
                        alert('Usuario modificado')
                    },
                    (error) => console.log(error)
                                
                )
                
                
        }
        this.props.history.go(-2)
        
    }   

    isValid = () => {
        return !Object.keys(this.state.update)
        .some(attr => this.state.errors[attr])
    }

    componentDidMount() {
        const { match: { params } } = this.props;
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
            <div className = "row justify-content-center mt-5 pl-5">
            <div className="box mx-auto col-sm-4 mt-5">

                <div className="">
                    <h3>Editar Usuario</h3>
                    <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>
                      
                        <FormField title="Nombre" name="name" 
                            value={this.state.update.name}
                            onChange={this.handleChange}  
                            error={this.state.errors.name}
                            onBlur={this.handleBlur} 
                            touch={this.state.touch.name}/>

                        
                        <FormField title="Empleo" name="job" 
                            value={this.state.update.job}
                            onChange={this.handleChange}  
                            error={this.state.errors.job}
                            onBlur={this.handleBlur} 
                            touch={this.state.touch.job}/>


                        <div className="col-6 pt-4">
                            <button className="btn btn-primary" form="profile-form" type="submit" disabled={!this.isValid()}>Editar Usuario</button>
                        </div>

                    </form>
                   
                </div>
                <a className="float-right"><i className='fa fa-reply fa-2x mt-3 text-danger' onClick={() => this.props.history.go(-1)}></i></a> 
                
                </div>
            </div>
        )

    }

}

export default UpdateUser;