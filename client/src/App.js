import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import * as actions from './actions';
import { routes } from './constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/styles/App.css';

import { View, Landing, Lost_404, Tutorial } from './pages';


const App = () => {
  const publicViews = (
    <Switch>
      <Route
        exact
        path={`(${routes.SEARCH}|${routes.BOOKS})`}
        component={Landing}
      />
      <Route exact path={routes.VIEW} component={View} />
      <Route exact path={routes.TUTORIAL} component={Tutorial} />
      <Route path='/404' component={Lost_404} />
      <Redirect exact from='/' to={routes.BOOKS} />
      <Route component={Lost_404} />
    </Switch>
  );

  return (
    <Router>
      <div className="app--main">
        <div className="view--container">
          {publicViews}
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(App);
