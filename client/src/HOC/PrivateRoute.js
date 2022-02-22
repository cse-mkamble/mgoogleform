import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const firstLogin = localStorage.getItem('firstLogin')

const PrivateRoute = (props) => {
  const firstLogin = localStorage.getItem('firstLogin')
  return firstLogin ? <Route {...props} /> : <Redirect to={{
    pathname: '/login',
    state: { from: props.location }
  }} />
}

export default PrivateRoute;
