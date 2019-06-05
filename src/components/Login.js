import React, { Component } from 'react'
import { login } from '../services/authService'
import { Redirect } from 'react-router-dom'
import FormField from './FormField'
import { GoogleLogin } from 'react-google-login'
import config from '../config.json'


const validations = {
    email: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),

}

class Login extends Component {

    state = {
        user: null,
        isAuthenticate: false,
        token: '',
        errors: {
            email: true,
            password: true
        },
        touch: {}
    }

    logout = () => {
        this.setState({ isAuthenticated: false, token: '', user: null })
    };

    googleResponse = (e) => { };

    onFailure = (error) => {
        alert(error);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const error = {
            [name]: !validations[e.target.name]
        }
        this.setState({
            user: {
                ...this.state.user,
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

    // handleSubmit = (e) => {

    //     console.log(this.state.user)
    //     e.preventDefault();
    //     if(this.isValid()) {
    //         this.setState({ user: { ...this.state.user} });
    //         login(this.state.user)
    //             .then(
    //                 (user) => {
    //                     console.log(user)
    //                     this.setState({ isAuthenticate: true });
    //                     console.log(user)
    //                 } 

    //             )

    //         }

    // }


    isValid = () => {
        return !Object.keys(this.state.user)
            .some(attr => this.state.errors[attr])
    }

    render() {
        if (this.state.isAuthenticate) {
            return (<Redirect to="/users" />);
        }
        let content = !!this.state.isAuthenticated ?
            (
                <div className="row justify-content-center mt-5 pl-5">
                    <div className="box mx-auto col-sm-4 mt-5 center-block">
                        <div>
                            <h3>Autenticación</h3>
                            <div>
                                {this.state.user.email}
                            </div>
                            <div className="col-6 pt-4">
                                <button onClick={this.logout} className="btn btn-primary btn-block ">
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
            (
                <div className="row justify-content-center mt-5 pl-5">
                    <div className="box mx-auto col-sm-4 mt-5 pt-5">
                        <div className="box mx-auto">
                            <GoogleLogin className="btn btn-primary btn-block"
                                clientId={config.GOOGLE_CLIENT_ID}
                                buttonText="Login"
                                onSuccess={this.googleResponse}
                                onFailure={this.googleResponse}
                            />
                        </div>
                    </div>
                </div>    
            );

        return (
            <div className="App">
                {content}
            </div>
        );
        // return (
        //     <div className = "row justify-content-center mt-5 pl-5">
        //     <div className="box mx-auto col-sm-4 mt-5">

        //         <div className="">
        //             <h3>Login</h3>
        //             <form id="profile-form" className="mt-4" onSubmit={this.handleSubmit}>

        //                 <FormField title="Email" name="email" 
        //                     value={this.state.user.email}
        //                     onChange={this.handleChange}  
        //                     error={this.state.errors.email}
        //                     onBlur={this.handleBlur} 
        //                     touch={this.state.touch.email}/>


        //                 <FormField title="Contraseña" name="password" 
        //                     value={this.state.user.password}
        //                     onChange={this.handleChange}  
        //                     error={this.state.errors.password}
        //                     onBlur={this.handleBlur} 
        //                     touch={this.state.touch.password}/>


        //                 <div className="col-6 pt-4">
        //                     <button  className="btn btn-primary btn-block" form="profile-form" type="submit" disabled={!this.isValid()}>Login</button>
        //                 </div>

        //             </form>

        //         </div>

        //     </div>
        // </div>

        // );
    }
}
export default Login