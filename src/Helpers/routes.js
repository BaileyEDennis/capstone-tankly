import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Decor from '../Views/Decor';
import Fish from '../Views/Fish';
import Home from '../Views/Home';
import NotFound from '../Views/NotFound';

export default function Routes() {
  return (
      <Switch>
        <Route exact path="/" component={() => <Home/>} />
        <Route exact path="/flora" component={() => <Decor/>} />
        <Route exact path="/fauna" component={() => <Fish/>} />
        <Route component={NotFound} />
      </Switch>
  );
}
