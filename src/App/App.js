import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Routes from '../Helpers/routes';

class App extends React.Component {
  render() {
    return (
      <>
      <div className="App">
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </div>
      </>
    );
  }
}

export default App;
