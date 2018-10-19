import React, { Component } from 'react';
import './App.css';
import{Route} from 'react-router';
import {LoginPage} from './components/loginPage'
import RegistrationForm from './components/register'

class App extends Component {
signout(){
  localStorage.removeItem('jwt');
  window.location.reload();
}

  render() {
    return (
      <div className="App">
       <Route path='/login' 
       render={props => (
       <LoginPage {...props} signout={this.signout}/>)}
       />
       <Route path='/register' 
       render={props => (
       <RegistrationForm {...props} />)}
       />
      </div>
    );
  }
}

export default App;
