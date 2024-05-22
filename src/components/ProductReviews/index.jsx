import React, {Component, Fragment} from 'react';
import SingleProductReview from './SingleProductReview/index';
import AddReview from './AddReview/index';
import './ProductReviews.scss';

export class ProductReviews extends Component {
  renderSingleProductReview (reviews) {
    if (reviews.length > 0) {
      return reviews.map((review, index) => {
        return <SingleProductReview key={index} review={review} />
      })
    } else {
      return (
        <div>
          <p>This product does not have a review yet </p>
        </div>)
    }
  }

  render() {
    const {
      reviews,
      handleAddSingleReview,
      productDetails,
    } = this.props;
    return (
      <Fragment>
        {
          <div className="product-reviews__main">
          <div className="product-reviews__container">
            <div className="product-reviews__width">
              <div className="product-reviews__reviewsSection">
                <div className="product-reviews__title">
                  <h3>Product reviews</h3>
                </div>
                {this.renderSingleProductReview(reviews)}
              </div>
              <div className="product-reviews__add">
                <AddReview
                  handleAddSingleReview={handleAddSingleReview}
                  productDetails={productDetails}
                />
              </div>
            </div>
          </div>
          </div>
        }
      </Fragment>
    );
  }
}

export default ProductReviews;
