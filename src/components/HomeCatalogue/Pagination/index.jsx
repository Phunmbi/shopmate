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

  renderPagination () {
    const {currentPage} = this.props;
    let range = [];
    switch (currentPage) {
			case 1:
				range = [currentPage, currentPage + 1, currentPage + 2, '...', this.lastPage()];
				return range;
			case this.lastPage():
				range = [1, '...', currentPage - 2, currentPage - 1, currentPage];
				return range;
      case this.lastPage() - 1:
        range = [1, '...', currentPage - 2, currentPage - 1, currentPage, this.lastPage()];
				return range;
      case this.lastPage() - 2:
				range = [1, '...', currentPage - 1, currentPage, currentPage + 1, this.lastPage()];
				return range;
			default:
				range = [currentPage - 1, currentPage, currentPage + 1, '...', this.lastPage()];
				return range;
		}
  }

  paginationClassName (currentPage, page) {
    return currentPage === page ? 'pagination-main__reference' : 'pagination-main__ref';
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

  renderPaginationNumbers (currentPage, handlePagination) {
    return (
			<div className="pagination-main__page">
				{this.renderPagination().map(page => {
					return (
						<div
							onClick={page === '...' ? null : () => handlePagination(page)}
							key={page}
							className={this.paginationClassName(currentPage, page)}
						>
							<p>{page}</p>
						</div>
					);
				})}
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
	productsCount: PropTypes.number,
	handlePagination: PropTypes.func
};

Pagination.defaultProps = {
	currentPage: 1,
	productsCount: null,
	handlePagination: null
};

export default Pagination;
