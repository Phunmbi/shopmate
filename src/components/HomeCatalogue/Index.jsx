import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Filter from './HomeCatalogueFilter/index';
import Catalogue from './Catalogue/index';
import './HomeCatalogue.scss';

export class HomeCatalogue extends Component {
	render () {
		const {allProducts} = this.props;
    return (
			<Fragment>
				<div className="home-catalogue">
					<div className="home-catalogue__main">
						<Filter />
						<Catalogue allProducts={allProducts} />
					</div>
				</div>
			</Fragment>
		);
  }
}

HomeCatalogue.propTypes = {
	allProducts: PropTypes.array
};

HomeCatalogue.defaultProps = {
	allProducts: []
}

export default HomeCatalogue;
