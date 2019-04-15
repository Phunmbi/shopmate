import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductCard.scss';

class Card extends Component {
    render() {
        const {product} = this.props;
        const srcImage = `https://backendapi.turing.com/images/products/${product.thumbnail}`;
        const productRedirect = `/product/${product.product_id}`;
        return (
            <Fragment>
                <Link to={productRedirect} className="card-main">
                    <div className="card-main__image">
                        <img src={srcImage} alt="Product" />
                    </div>
                    <h3>{product.name}</h3>
                    <p className="card-main__price">£{product.price}</p>
                    <button className="card-main__button">Buy now</button>
                </Link>
            </Fragment>
        );
    }
}

Card.propTypes = {
	product: PropTypes.object,
};

Card.defaultProps = {
	product: {}
};

export default Card;
