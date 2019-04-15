import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Card from './ProductCard/index';
import './Catalogue.scss';

class Catalogue extends Component {
    render() {
        const { allProducts } = this.props;
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
}


Catalogue.propTypes = {
	allProducts: PropTypes.array
};

Catalogue.defaultProps = {
	allProducts: []
};

export default Catalogue;
