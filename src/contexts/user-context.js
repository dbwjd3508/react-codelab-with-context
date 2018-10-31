import React, { Component, createContext } from 'react';

const Context = createContext();

const { Provider, Consumer: UserConsumer } = Context; 

class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    }

    this.actions = {
      listUser: (users => this.setState({users}))
    }
  }

  render(){
    const {state, actions} = this;

    const value = {state, actions};

    return (
      <Provider value={value}>
        {this.props.children}
      </Provider>
    );
  }
}

export {
  UserProvider,
  UserConsumer,
};