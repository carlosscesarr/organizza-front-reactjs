import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
//import Layout from './containers/Layout';
const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'));
const CriarConta = lazy(() => import('./pages/CriarConta'));

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/criar-conta" component={CriarConta}/>

          <Route path="/app" component={Layout} />

          <Redirect exact from="/" to="login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
