import React, {Component} from "react";
import axios from "axios";
import Login from './login';

class Jokes extends Component {
  state = {
    jokes: []
  };

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const options = {
      headers: {
        Authorization: token
      }
    };
    console.log(options);

 if(options){
    axios
      .get("http://localhost:3300/api/jokes", options)
      .then(response => {
        console.log(response);
        this.setState({jokes: response.data});
        window.page.reload();
      })
      .catch(err => {
        console.log(err);
      });
    }
      
  }
 

  render() {
    return (
      <div>
        <header>
        <h1>DAD JOKES</h1>
        <Login {...this.props} signout={this.props.signout}/>

        </header>
      
        <div className='Container'> 
            {this.state.jokes.map(joke => (
            
             <div className='Inner-joke'>
               <h4 key='joke.id'><u>Setup</u>: {joke.setup} </h4>
               <h4 key='joke.punchline'><u>Punchline</u>: {joke.punchline}</h4>
               </div>
           ))}
         </div> 
      </div>
    );
  }
}

 export  default Jokes;