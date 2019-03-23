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
import './Homepage.scss'
import {getProducts} from '../../redux/actionCreator/products'

export class Homepage extends Component {
	state = {
		page: 1,
	}

	componentDidMount () {
		this.fetchProducts();
		console.log( this.props );
	}

	fetchProducts () {
		const { page } = this.state;
		const { getProducts } = this.props;
		getProducts(page, 6);
	}

	handlePagination = async ( pageNumber ) => {
		const {getProducts} = this.props;

		this.setState( {
			page: pageNumber
		} )

		await getProducts(pageNumber, 6);
	}

	render () {
		const {allProducts, productsCount, productsLoading} = this.props;
		const {page} = this.state;
    return (
			<Fragment>
				<div className="homepage">
					<header className="navbar">
						<NavbarHome />
						<NavbarProfile />
					</header>
					<div className="catalogue-section">
						<Hero />
						{productsLoading  ? <Loading size="full" /> : <HomeCatalogue allProducts={allProducts} />}
						{productsLoading  ? (
							<Loading  size="small" />
						) : (
							<Pagination
								currentPage={page}
								productsCount={productsCount}
								handlePagination={this.handlePagination}
							/>
						)}
						<BrandAd />
					</div>
					<div className="subscription-section">
						<Subscription />
					</div>
					<footer className="footer">
						<Footer />
					</footer>
				</div>
			</Fragment>
		);
  }
}

Homepage.propTypes = {
	getProducts: PropTypes.func,
	allProducts: PropTypes.array,
	productsLoading: PropTypes.bool,
	productsCount: PropTypes.number,
};

Homepage.defaultProps = {
	getProducts: null,
	allProducts: [],
	productsCount: null,
	productsLoading: false,
};

const mapStateToProps = ( {products} ) => ( {
	allProducts: products.products,
	productsCount: products.count,
	productsLoading: products.loading
} );

const mapDispatchToProps = {
	getProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
