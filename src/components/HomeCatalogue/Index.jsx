import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Filter from './HomeCatalogueFilter/index';
import Catalogue from './Catalogue/index';
import ZeroCount from '../../components/ZeroCount';
import './HomeCatalogue.scss';

export class HomeCatalogue extends Component {
	render () {
		const {
			allProducts,
			filterResults,
			productCount,
			fetchProducts,
			resetFilter,
			filterAllCategories,
			filterAllDepartments,
		} = this.props;
    return (
			<Fragment>
				<div className="home-catalogue">
					<div className="home-catalogue__main">
						<Filter
							filterAllCategories={filterAllCategories}
							filterAllDepartments={filterAllDepartments}
							filterResults={filterResults}
							productCount={productCount}
							fetchProducts={fetchProducts}
							resetFilter={resetFilter}
						/>
						{productCount > 0 ? <Catalogue allProducts={allProducts} />: <ZeroCount /> }
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
};

export default HomeCatalogue;
