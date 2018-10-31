import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import { Home, Login, Register } from 'containers';
import { UserProvider } from '../contexts/user-context';

class App extends Component {
  render() {
    return (
      <div>
        <UserProvider>
          <Route exact exact path="/" component={Home}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/Register" component={Register}/>
        </UserProvider>
      </div>
    );
  }
}

export default App;
