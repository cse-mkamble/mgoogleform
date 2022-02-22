import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PrivateRoute from './HOC/PrivateRoute';

import Home from './Screens/Home';
import Login from './Screens/Login';
import EditForm from './Screens/EditForm';
import UserView from './Components/Responding/UserView';

import { refreshToken } from './Redux/actions/authAction';
import DataProvider from './Redux/store';

function Application() {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (<Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/form/:formId" component={EditForm} />
      <Route exact path="/s/:formId" component={UserView} />
    </Switch>
  </Router>);
}

ReactDOM.render(<DataProvider>
  <Application />
</DataProvider>, document.getElementById('root'));
