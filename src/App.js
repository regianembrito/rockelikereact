import React from 'react';

import './App.css';
import Article from './Rock/Article';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navheader">
          <div className="collapse navbar-collapse" >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={'/Article'} className="nav-link">Article</Link>
              </li>
            </ul>
          </div>
        </nav> <br />
        <Switch>
          <Route exact path='/Article' component={Article} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
