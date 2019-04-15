import React, {Component, Fragment} from 'react';
import GoldStar from '../../../images/gold 4.svg';
import SilverStar from '../../../images/grey 1.svg';
import './AddReview.scss';

export class AddReview extends Component {
  state = {
    values: {
      nickname: "",
      review: "",
      stars:{
        1: "silver",
        2: "silver",
        3: "silver",
        4: "silver",
        5: "silver",
      }
    }
  };

  render() {
    return (
      <Fragment>
        <div className="add-review__container">
          <h3>Add a review</h3>
          <form>
            <div className="add-review__nickname">
              <label htmlFor="nickname">
                Choose a nickname
                <div className="add-review__input">
                  <input type="text"/>
                </div>
              </label>
            </div>
            <div className="add-review__reviewDetails">
              <label htmlFor="review">
                Your review
                <div>
                  <textarea name="review" id="review" cols="30" rows="10" />
                  <p>Your review must be at least 50 characters <span>Full review guidelines</span></p>
                </div>
              </label>
            </div>
            <div className="add-review__rating">
              <label htmlFor="rating">
                Overall rating
                <div className="add-review__stars">
                  {Object.keys(this.state.values.stars).map((eachValue, index) => {
                    return (this.state.values.stars[eachValue] === "silver" ?
                      <img key={index} src={SilverStar} alt=""/> :
                      <img key={index} src={GoldStar} alt=""/>)
                  })}
                </div>
              </label>
            </div>
            <div className="add-review__submit">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default AddReview;
