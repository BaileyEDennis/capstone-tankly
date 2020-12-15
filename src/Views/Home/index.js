import React from 'react';
import Auth from '../../Components/Auth';
import Loader from '../../Components/Loader';
import PublicTanks from '../PublicTanks';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <PublicTanks user={user}/>;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div className='display-area'>
      <h1>Welcome to Tankly!</h1>
      {loadComponent()}
    </div>
  );
}
