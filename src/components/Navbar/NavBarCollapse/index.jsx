import React, {Component, Fragment} from 'react';
import MenuIcon from '../../../images/menu.svg';
import './navbarCollapse.scss'

class NavBarCollapse extends Component {
  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <div className="navbar-collapse">
          <div className="navbar-collapse__container">
            <h3 onClick={() => {history.push('/')}}>SHOPMATE</h3>
            <img src={MenuIcon} alt="Menu"/>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NavBarCollapse;
