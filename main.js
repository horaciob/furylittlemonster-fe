import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/App.jsx';
import Jobs from './modules/Jobs.jsx';
import { Router, Route, hashHistory } from 'react-router'

ReactDOM.render((
      <Router history={hashHistory}>
      <Route path="/" component={App}/>
      <Route path="/jobs/:job_id" component={Jobs}/>
      </Router>
      ), document.getElementById('app'))
