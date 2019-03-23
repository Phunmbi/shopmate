import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Card from './ProductCard/index';
import './Catalogue.scss';

export const Catalogue = props => {
	const { allProducts } = props;
	return (
		<Fragment>
			<div className="catalogue-main">
				{allProducts.map(product => {
					return <Card key={product.product_id} product={product} />
				})}
			</div>
		</Fragment>
	)
}

Catalogue.propTypes = {
	allProducts: PropTypes.array
}

Catalogue.defaultProps = {
	allProducts: []
}

export default Catalogue;
