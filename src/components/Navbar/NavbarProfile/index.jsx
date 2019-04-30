import React, {Component, Fragment} from 'react'
import UserProfile from '../../../images/profile-picture.svg'
import Search from '../../../images/search.svg';
import './NavbarProfile.scss';

export default class index extends Component {
	state = {
		searchValue: ""
	};

	handleSearchChange =  (event) => {
		this.setState({
			searchValue: event.target.value,
		})
	};

	handleResetSearch = () => {
		this.setState({
			searchValue: "",
		});
		const { resetSearch } = this.props;
		resetSearch();
	};

	render() {
        const { handleSearch } = this.props;
  		return (
			<Fragment>
				<div className="navbar-profile">
					<div className="navbar-profile__main">
						<h1 className="navbar-profile__brand">SHOPMATE</h1>
						<div className="navbar-profile__search">
							<img src={Search} alt="search" />
							<form onSubmit={event => handleSearch(event, this.state.searchValue)}>
								<input onChange={this.handleSearchChange} value={this.state.searchValue} type="search" placeholder="search anything" />
							</form>
							<p onClick={() => this.handleResetSearch()}>x</p>
						</div>
						{localStorage.isAuthenticated ? (<div className="navbar-profile__user">
							<img src={UserProfile} alt="Profile" />
						</div>) : null}
					</div>
				</div>
			</Fragment>
		);
  	}
}
