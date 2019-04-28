import React, {Component, Fragment} from 'react';
import UserProfile from '../../../images/profile-picture.svg'
import './navbarCollapse.scss'

class NavBarCollapse extends Component {
  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <div className="navbar-collapse">
          <div className="navbar-collapse__container">
            <h3 onClick={() => {history.push('/')}}>SHOPMATE</h3>
            {localStorage.isAuthenticated ? <img src={UserProfile} alt="Profile"/> : null}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default NavBarCollapse;
