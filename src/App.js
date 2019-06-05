import React, { Component } from 'react';
import {  Switch, Route } from 'react-router-dom';
import NavBar from './components/misc/NavBar'
import Login from './components/Login'
import UserList from './components/UsersList'
import User from './components/User'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
// import PrivateRoute from './guards/PrivateRoute'


class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar/>
          <section>
            <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/users" component={UserList}/>
              {/* <PrivateRoute exact path="/users" component={UserList}/> */}
              <Route exact path="/users/create" component={CreateUser}/>
              {/* <PrivateRoute exact path="/users/create" component={CreateUser}/> */}
              <Route exact path="/users/:id" component={User}/>
              {/* <PrivateRoute exact path="/users/:id" component={User}/> */}
              <Route exact path="/users/:id/edit" component={UpdateUser}/>
              {/* <PrivateRoute exact path="/users/:id/edit" component={UpdateUser}/> */}
            </Switch>
          </section>
      </div>
    );

  }
}

export default App;
