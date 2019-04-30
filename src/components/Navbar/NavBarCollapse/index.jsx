import React, {Component, Fragment} from 'react';
import toast from 'toastr';
import UserProfile from '../../../images/profile-picture.svg'
import './navbarCollapse.scss'

class NavBarCollapse extends Component {
  state = {
    displayDropDown: false
  };
  
  renderDropDown = () => {
    return (
      <div className="dropdown-main">
        <p onClick={() => this.handleSignOut()}>Sign out</p>
      </div>
    )
  };
  
  handleDropDown = () => {
    this.state.displayDropDown ? this.setState({displayDropDown: false}) :
    this.setState({displayDropDown: true});
  };
  
  handleSignOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("name");
    this.props.history.push('/');
    toast.success("Successfully signed user out");
  };
  
  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <div className="navbar-collapse">
          <div className="navbar-collapse__container">
            <h3 onClick={() => {history.push('/')}}>SHOPMATE</h3>
            {localStorage.isAuthenticated ? <img onClick={() => this.handleDropDown()} src={UserProfile} alt="Profile"/> : null}
          </div>
          {this.state.displayDropDown ? <div className="dropdown-container">{this.renderDropDown()}</div> : null}
        </div>
      </Fragment>
    );
  }
}

export default NavBarCollapse;
