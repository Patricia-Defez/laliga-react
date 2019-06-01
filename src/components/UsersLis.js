import React, { Component } from 'react';
import { list } from '../services/UsersService'


class UsersList extends Component {
    
    state = {
        users: [],
        error: null
    }

    componentDidMount = () => {
        list()
            .then(response => {
                this.setState({ users: response.data })
                console.log(this.props)
            });
           
        
        
    }

    render = () => {
        return (
            
            <div className="box mx-auto mt-5">
                <h1>Hola</h1>
                {this.state.users.map((user, index)=> (
                     <p {...user} key={index}>{user.first_name}</p>
                )

                )}
            </div>

        )

    }
}

export default UsersList;