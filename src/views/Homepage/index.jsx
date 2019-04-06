import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavbarHome from '../../components/Navbar/NavbarHome/Index';
import NavbarProfile from '../../components/Navbar/NavbarProfile/index';
import Hero from '../../components/Hero/index'
import HomeCatalogue from '../../components/HomeCatalogue/Index';
import BrandAd from '../../components/BrandAd/index';
import Pagination from '../../components/HomeCatalogue/Pagination/index';
import Loading from '../../components/Loading/index';
import Subscription from '../../components/Subscription';
import Footer from '../../components/Footer/index';
import SignUp from '../SignUp/index';
import SignIn from '../SignIn/index';
import './Homepage.scss'
import {
	getProducts,
	filterAllDepartments,
	filterAllCategories,
	searchAllProducts,
} from '../../redux/actionCreator/products';
import {signUp, signIn} from '../../redux/actionCreator/auth';

export class Homepage extends Component {
	state = {
		page: 1,
		displayModal: false,
		openModal: "none",
		filtering: false,
	};

	componentDidMount () {
		const filtering = localStorage.getItem( "filtering" );
		const isACategorySelected = localStorage.getItem( "isACategorySelected" );
		const selectedCategory = localStorage.getItem( "selectedCategoryID" );
		const selectedDepartment = localStorage.getItem( 'selectedDepartmentID' );
		if ( filtering ) {
			isACategorySelected
				? this.filterAllCategories(selectedCategory)
				: this.filterAllDepartments(selectedDepartment);
		} else {
			this.fetchProducts();
		}
	}

	signupUser = (query) => {
		const {signUp} = this.props;
		signUp(query, this.handleCloseModal);
	};

	signInUser = ( query ) => {
		const {signIn} = this.props;
		signIn(query, this.handleCloseModal);
	};

	fetchProducts = () => {
		const { page } = this.state;
		const { getProducts } = this.props;
		getProducts(page, 6);
	};

	filterAllDepartments = ( deptId ) => {
		const {page} = this.state;
		const {filterAllDepartments} = this.props;

		this.setState( {
			...this.state,
			page: 1,
			filtering: true,
		} );

		localStorage.setItem( "filtering", true );
		filterAllDepartments( deptId, { page, limit:6} );
	};

	filterAllCategories = ( categoryID ) => {
		const {page} = this.state;
		const {filterAllCategories } = this.props;

		this.setState({
			...this.state,
			page: 1,
			filtering: true,
		});

		localStorage.setItem( "filtering", true );
		filterAllCategories(categoryID, { page, limit: 6 });
	};

	resetFilter = () => {
		this.fetchProducts();
		localStorage.removeItem( "selectedDepartment" );
		localStorage.removeItem( 'selectedDepartmentID' );
		localStorage.removeItem( 'filtering' );
		localStorage.removeItem('selectedCategory');
		localStorage.removeItem('selectedCategoryID');
		localStorage.removeItem('isACategorySelected');

		this.setState( {
			...this.state,
			page:1
		})
	};

	handlePagination = ( pageNumber ) => {
		const {getProducts, filterAllDepartments} = this.props;

		this.setState( {
			page: pageNumber
		} );

		const filtering = localStorage.getItem( "filtering" );
		const selectedDepartment = localStorage.getItem( "selectedDepartmentID" );

		if ( filtering ) {
			filterAllDepartments( selectedDepartment, { page:pageNumber, limit: 6 } );
		} else {
			getProducts( pageNumber, 6 )
		}
	};

	handleDisplayModal = (modal) => {
		this.setState({
			displayModal: true,
			openModal: modal
		});
	};

	handleCloseModal = () => {
		this.setState( {
			displayModal: false,
		})
	};

	handleSearch = (event, queryString) => {
		event.preventDefault();
		const { searchAllProducts } = this.props;
		searchAllProducts(queryString, {page: 1, limit: 6});
	};

	resetSearch = () => {
		this.fetchProducts();
	};

	renderModals ( displayModal, openModal ) {
		const {authLoading} = this.props;
		switch (openModal) {
			case "signup":
				return (
					<SignUp
						displayModal={displayModal}
						handleCloseModal={this.handleCloseModal}
						signupUser={this.signupUser}
						authLoading={authLoading}
					/>
				);
			case "signin":
				return (
					<SignIn
						displayModal={displayModal}
						handleCloseModal={this.handleCloseModal}
						signInUser={this.signInUser}
						authLoading={authLoading}
					/>
				);
			default:
				return null;
		}
	}

	renderCatalogue () {
		const {allProducts, productsLoading, productsResponse, productsCount} = this.props;
		return productsLoading ? (
			<Loading size="full" />
		) : (
			<HomeCatalogue
				filterResults={productsResponse}
				allProducts={allProducts}
				productCount={productsCount}
				filterAllCategories={this.filterAllCategories}
				filterAllDepartments={this.filterAllDepartments}
				fetchProducts={this.fetchProducts}
				resetFilter={this.resetFilter}
			/>
		);
	}

	renderPagination () {
		const {productsCount, productsLoading} = this.props;
		const {page} = this.state;

		return (
			productsLoading  ? (
				<Loading  size="small" />
			) : (
				<Pagination
					currentPage={page}
					productsCount={productsCount}
					handlePagination={this.handlePagination}
				/>
			)
		)
	}

	render () {
		const {
			displayModal,
			openModal
		} = this.state;
    	return (
			<Fragment>
				<div className="homepage">
					<header className="navbar">
						<NavbarHome handleDisplayModal={this.handleDisplayModal} authAccess={this.authAccess} />
						<NavbarProfile handleSearch={this.handleSearch} resetSearch={this.resetSearch}/>
					</header>
					<div className="catalogue-section">
						<Hero />
						{this.renderCatalogue()}
						{this.renderPagination()}
						<BrandAd />
					</div>
					<div className="subscription-section">
						<Subscription />
					</div>
					<footer className="footer">
						<Footer />
					</footer>
				</div>

				{this.renderModals(displayModal, openModal)}
			</Fragment>
		);
  }
}

Homepage.propTypes = {
	getProducts: PropTypes.func,
	allProducts: PropTypes.array,
	productsLoading: PropTypes.bool,
	productsCount: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.object,
	] ),
	productsResponse: PropTypes.object,
};

Homepage.defaultProps = {
	getProducts: null,
	allProducts: [],
	productsCount: null,
	productsLoading: false,
	productsResponse: null,
};

const mapStateToProps = ({ products,auth }) => ({
	allProducts: products.products,
	productsCount: products.count,
	productsLoading: products.loading,
	authLoading: auth.loading,
	productsResponse: products,
});

const mapDispatchToProps = {
	getProducts,
	signUp,
	signIn,
	filterAllDepartments,
	filterAllCategories,
	searchAllProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
