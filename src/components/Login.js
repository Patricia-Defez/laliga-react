import React, { Component } from 'react'
import { login } from '../services/authService'
import { Redirect } from 'react-router-dom'
import FormField from './FormField'
import { GoogleLogin } from 'react-google-login'
import config from '../config.json'




class Login extends Component {

    state = {
        user: null,
        isAuthenticate: false,
        token: '',
        
    }

    logout = () => {
        this.setState({ isAuthenticated: false, token: '', user: null })
    };

    googleResponse = (e) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('https://reqres.in/api/login', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                    console.log(user)
                }
            });
        })
     };

    onFailure = (error) => {
        alert(error);
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
       
    }
}
export default Login