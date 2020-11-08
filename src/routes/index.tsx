import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />

      <Route path="/dashboard" exact component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
