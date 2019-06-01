import React, { Component } from 'react';
import {  Switch, Route } from 'react-router-dom';
import NavBar from './components/misc/NavBar'
import UserList from './components/UsersLis'

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar/>
          <Route path="/users" component={UserList}/>

      </div>
    );

  }
}

export default App;
