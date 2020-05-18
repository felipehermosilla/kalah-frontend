import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';

class Layout extends Component{
  render () {
    const mainClasses = ['container', classes.Content];
    const headerClasses = ['navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar', classes.Header];
    return (
      <Aux>
        <header className={headerClasses.join(' ')}>
          <div className="navbar-nav-scroll">
            <ul className="navbar-nav bd-navbar-nav flex-row">
              <li className="nav-item">
                <b>Kalah Game</b>
              </li>
            </ul>
          </div>
        </header>
        <main className={mainClasses.join(' ')}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
