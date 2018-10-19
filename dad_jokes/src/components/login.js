import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name + ": " + event.target.value);
  };

  submitForm = event => { 
    event.preventDefault()

    const loginInfo = {
      username: this.state.username,
      password: this.state.password
    };
    console.log(loginInfo);

    axios
      .post("http://localhost:3300/api/login", loginInfo)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={this.handleInput}
          name="username"
        />
        <input
          type="text"
          placeholder="password"
          onChange={this.handleInput}
          name="password"
        />

        <button onClick={this.submitForm}>Submit</button>
        <button onClick={this.props.signout} > Sign Out </button>
      </div>
    );
  }
}

export default Login;
