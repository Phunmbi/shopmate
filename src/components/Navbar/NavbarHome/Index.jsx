import React, {Component,Fragment} from 'react';
import {Link} from 'react-router-dom';
import Cart from '../../Badge/Cart';
import UKFlag from '../../../images/united-kingdom-icon.svg';
import './NavbarHome.scss';

export class NavbarHome extends Component {
	render () {
		const {handleDisplayModal} = this.props;
		const isAuthenticated = localStorage.getItem( "isAuthenticated" );
		const userName = localStorage.getItem( "name" );
		return (
			<Fragment>
				<div className="navbar-home">
					<div className="navbar-home__main">
						{isAuthenticated ? (
							<div className="navbar-home__action .Text-Style-2">
								<h3 className="navbar-home__action1">Hi! </h3>
								<h3 className="navbar-home__action2"> {userName}, </h3>
								<h3 className="navbar-home__action1">Welcome </h3>
							</div>
						) : (
							<div className="navbar-home__action .Text-Style-2">
								<h3 className="navbar-home__action1">Hi! </h3>
								<h3
									onClick={() => handleDisplayModal('signin')}
									className="navbar-home__action2"
								>
									Sign in
								</h3>
								<h3 className="navbar-home__action1">or </h3>
								<h3
									onClick={() => handleDisplayModal('signup')}
									className="navbar-home__action2"
								>
									Register
								</h3>
							</div>
						)}
						<div className="navbar-home__link">
							<Link to="#">Daily Deals</Link>
							<Link to="#">Sell</Link>
							<Link to="#">Help & Contact</Link>
						</div>
						<div className="navbar-home__nation">
							<img src={UKFlag} alt="United Kingdom Flag" />
							<h3>£ GBP</h3>
						</div>
						<div className="navbar-home__cart">
							<Cart />
							<div>Your Bag: £3.99</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default NavbarHome;

