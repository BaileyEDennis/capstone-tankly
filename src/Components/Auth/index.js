import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import BgVid from '../backgroundVideo';

export default class Auth extends Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth">
        <h1>Welcome To Tankly</h1>
        <h3>
          Tankly is a dashboard to keep track of your aquariums, and all that
          goes in it.
        </h3>
        <button className="btn btn-secondary" onClick={this.loginClickEvent}>
          <i className="fab fa-google"></i>oogle login
        </button>
        <BgVid />
      </div>
    );
  }
}
