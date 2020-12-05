import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Decor from '../Views/Decor';
import Tanks from '../Views/Tanks';
import Fish from '../Views/Fish';
import Home from '../Views/Home';
import NotFound from '../Views/NotFound';

export default function Routes({ user }) {
  return (
      <Switch>
        <Route exact path="/" component={() => <Home user={user}/>} />
        <Route exact path="/tanks" component={() => <Tanks user={user}/>} />
        <Route exact path="/flora" component={() => <Decor user={user}/>} />
        <Route exact path="/fauna" component={() => <Fish user={user}/>} />
        <Route component={NotFound} />
      </Switch>
  );
}
