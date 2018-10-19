import React, {Component} from 'react';
import axios from 'axios';

class RegistrationForm extends Component {
    state ={
        username: "",
        password: "",
        department: "",
    };

handleInput = (event) => {
this.setState({[event.target.username]: event.target.value })
console.log(event.target.username + event.target.value )
}

submitForm = (event) => {
    event.preventDefault();
    const newUser = {name: this.state.username, password: this.state.password, department: this.state.password }
    console.log(newUser);

    axios
    .post('http://localhost:4000/api/register', newUser)
    .then(res => {
        console.log(res)
       
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/users')
    })
    .catch(err => {console.log(err.status + err.message)})
}

render(){
return(
    <header>
 <div>
     <h1>Dad Jokes</h1>
    <input type="text" placeholder="username" onChange={this.handleInput} name="username"/> 
    <input type="text" placeholder="password" onChange={this.handleInput} name="password"/> 
    <input type="text" placeholder="department" onChange={this.handleInput} name ="department"/>
    <button onClick={this.submitForm}>Register</button> 
    </div>

    </header>
   
)}

}

export default RegistrationForm;