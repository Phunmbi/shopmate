import React, {Component,Fragment} from 'react';
import Cart from '../../Badge/Cart';
import './NavbarHome.scss';

export class NavbarHome extends Component {
	componentDidMount() {
		const { retrieveCart } = this.props;
		retrieveCart();
	}
	
	render () {
		const {handleDisplayModal, cartCount, bagTotal} = this.props;
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
						<div onClick={() => handleDisplayModal('checkoutCart')} className="navbar-home__cart">
							<Cart cartCount={cartCount}/>
							<div>Your Bag: £{bagTotal()}</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default NavbarHome;

