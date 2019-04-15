import React, {Component, Fragment} from 'react';
import moment from 'moment';
import GoldStar from '../../../images/gold 4.svg';
import SilverStar from '../../../images/grey 1.svg';
import './SingleProductReview.scss';

class SingleProductReview extends Component {
  renderRatings = (ratingCount) => {
    const goldStars = [];
    const silverStars = [];

    for (let i = 0; i < ratingCount; i++) {
      goldStars.push(GoldStar);
    }

    for (let i = 0; i < 5 - ratingCount; i++) {
      silverStars.push(SilverStar);
    }
    const starsDisplayed = [...goldStars, ...silverStars];

    return starsDisplayed;
  };

  render() {
    const {review} = this.props;
    return (
      <Fragment>
        <div className="single-review__container">
          <div className="single-review__rating">
            {this.renderRatings(review.rating).map((eachRating, index) => {
              return <img key={index} src={eachRating} alt=""/>
            })}
          </div>
          <div className="single-review__description">
            <p>{review.review}</p>
          </div>
        </div>
        <div className="single-review__details">
          <div className="single-review__reviewer">
            <h3>{review.name}</h3>
          </div>
          <div className="single-review__reviewedOn">
            <p>{moment(review.created_on).fromNow()}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SingleProductReview;
