import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './ProductCard.scss';

export const Card = props => {
	const {product} = props;
	const srcImage = `https://backendapi.turing.com/images/products/${product.thumbnail}`;
	return (
		<Fragment>
			<div className="card-main">
				<div className="card-main__image">
					<img src={srcImage} alt="Product" />
				</div>
				<h3>{product.name}</h3>
				<p className="card-main__price">£{product.price}</p>
				<button className="card-main__button">Buy now</button>
			</div>
		</Fragment>
	);
}

Card.propTypes = {
	product: PropTypes.object,
}

Card.defaultProps = {
	product: {}
}

export default Card;
