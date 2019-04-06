import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss'
import BackArrow from '../../../images/backArrow.svg';
import ForwardArrow from '../../../images/forwardArrow.svg';

export class Pagination extends Component {
  lastPage () {
    const {productsCount} = this.props;
    return Math.ceil(productsCount / 6);
  }

  renderBackButton (currentPage, handlePagination) {
    return (
			<div
				onClick={currentPage === 1 ? null : () => handlePagination(currentPage - 1)}
				className="pagination-main__directionLeft"
			>
				<div className="pagination-main__back">
					<img src={BackArrow} alt="Back" />
				</div>
				<p>Back</p>
			</div>
		);
  }

  renderForwardButton (currentPage, handlePagination) {
    return (
			<div
				onClick={
					(currentPage === this.lastPage() ? null : () => handlePagination(currentPage + 1))
				}
				className="pagination-main__directionRight"
			>
				<p>Forward</p>
				<div className="pagination-main__forward">
					<img src={ForwardArrow} alt="Back" />
				</div>
			</div>
		);
  }

  renderPaginationNumbers (currentPage) {
    return (
			<div className="pagination-main__page">
				<p className="pagination-main__reference">{currentPage}</p>
				<p>of</p>
				<p>{this.lastPage()}</p>
			</div>
		);
  }

  render () {
    const { currentPage, handlePagination } = this.props;
    return (
			<Fragment>
				<div className="pagination">
					<div className="pagination-main">
						{this.renderBackButton(currentPage, handlePagination)}
						{this.renderPaginationNumbers(currentPage, handlePagination)}
						{this.renderForwardButton(currentPage, handlePagination)}
					</div>
				</div>
			</Fragment>
		);
  }
}

Pagination.propTypes = {
	currentPage: PropTypes.number,
	productsCount: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.object,
	] ),
	handlePagination: PropTypes.func
};

Pagination.defaultProps = {
	currentPage: 1,
	productsCount: null,
	handlePagination: null
};

export default Pagination;
