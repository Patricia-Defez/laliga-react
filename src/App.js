import React, { Component } from 'react';
import {  Switch, Route } from 'react-router-dom';
import NavBar from './components/misc/NavBar'
import UserList from './components/UsersList'
import User from './components/User'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar/>
          <section>
            <Switch>
              <Route exact path="/users" component={UserList}/>
              <Route exact path="/users/create" component={CreateUser}/>
              <Route exact path="/users/:id" component={User}/>
              <Route exact path="/users/:id/edit" component={UpdateUser}/>
            </Switch>
          </section>
      </div>
    );

  }
}

export default App;
