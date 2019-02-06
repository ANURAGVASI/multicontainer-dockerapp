import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    const self = this;
  }

  state = {
    users: []
  }

  getUsers = () => {
    axios.get("/api/users")
      .then((res) => {
        this.setState({users:res.data})
        console.log(res);
      });
  }

  addUser = () => {
    const name = document.getElementsByClassName("username")[0].value;
    axios.post("/api/user", {
      name
    }).then((res) => {
       this.getUsers();
    })
  }

  render() {
    return (
      <div className="App">
        <input type="text" className="username" placeholder="name" />
        <button onClick={this.addUser} >add user</button> 
        <br/>
        <br/>
        <button onClick={this.getUsers} >list users</button>
        {
          this.state.users.map((user) => {
            return (
              <p key={user._id} >{user.name}</p>
            )
          })
        }
        <p></p>
      </div>
    );
  }
}

export default App;
