import React, { Component } from 'react';
import { UserPasswordCredential, GoogleRedirectCredential } from "mongodb-stitch-browser-sdk";
import { stitch } from '../index';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export class Login extends Component {
  
    state = {
    username: '',
    password: '',
    user: stitch.auth.user ? stitch.auth.user : null,
  }


  login = () => {
    stitch.auth.loginWithCredential(new UserPasswordCredential(this.state.username, this.state.password))
      .then(() => {
        console.log(stitch.auth.user.id); this.props.history.push(`/home/`);
        // window.location.href = '/home'; 
        //this.setState({ user: stitch.auth.user }); window.location.href = '/home' 
      })
  }

  loginWithGmail = () => {
    stitch.auth.loginWithRedirect(new GoogleRedirectCredential('http://localhost:8000/'))
  }

  logout = () => {
    stitch.auth.logout().then(n =>  this.props.history.push(`/login/`))
  }

  render() {
    return (
      <div >
        <br /> <br />
        <Modal.Dialog>
          <Modal.Header style={{ backgroundColor: 'rgba(192, 255, 119, 0.479)'}}>
            <Modal.Title style={{ fontFamily: 'palatino'}}>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input 
              onChange={e => this.setState({ username: e.target.value })}
              className="form-control"
              placeholder="user" />
            <input 
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              className="form-control"
              placeholder="password" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" size="sm" onClick={this.login}>Stitch Login</Button>
            <Button variant="dark" size="sm" onClick={this.loginWithGmail}>Gmail Login</Button>
            <Button variant="dark" size="sm" onClick={this.logout}>Logout</Button>
          </Modal.Footer>
        </Modal.Dialog>

      </div>

    )
  }
}