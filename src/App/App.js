import React from 'react';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../Helpers/data/connection';
import NavBar from '../Components/NavBar';
import Routes from '../Helpers/routes';

fbConnection();

class App extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user } = this.state;
    return (
      <div className='App'>
        <Router>
          <NavBar user={user} />
          <Routes user={user} />
        </Router>
      </div>
    );
  }
}

export default App;
