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
                <Link to={productRedirect} className="card-container" >
                    <div className="card-main">
                        <div className="card-main__image">
                            <img src={srcImage} alt="Product" />
                        </div>
                        <h3>{product.name}</h3>
                        {product.discounted_price === "0.00" ?
                          (
                            <p className="card-main__price">£{product.price}</p>
                          ) :
                          (
                            <div className="card-main__prices">
                                <p className="card-main__discountedPrice">£{product.price}</p>
                                <p className="card-main__price">£{product.discounted_price}</p>
                            </div>
                          )
                        }
                        
                        <button className="card-main__button">Buy now</button>
                    </div>
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
