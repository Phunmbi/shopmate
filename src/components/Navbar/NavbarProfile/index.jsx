import React, {Component, Fragment} from 'react'
import UserProfile from '../../../images/profile-picture.svg'
import Search from '../../../images/search.svg';
import './NavbarProfile.scss';

export default class index extends Component {
  render() {
    return (
			<Fragment>
				<div className="navbar-profile">
					<div className="navbar-profile__main">
						<h1 className="navbar-profile__brand">SHOPMATE</h1>
						<div className="navbar-profile__categories">
							<h3>Women</h3>
							<h3>Men</h3>
							<h3>Kids</h3>
							<h3>Shoes</h3>
							<h3>Brands</h3>
						</div>
						<div className="navbar-profile__search">
							<img src={Search} alt="search" />
							<input type="search" placeholder="search anything" />
							<p>x</p>
						</div>
						<div className="navbar-profile__user">
							<img src={UserProfile} alt="Profile" />
						</div>
					</div>
				</div>
			</Fragment>
		);
  }
}
