import React, {Component, Fragment} from 'react';
import GoldStar from '../../../images/gold 4.svg';
import SilverStar from '../../../images/grey 1.svg';
import './AddReview.scss';

export class AddReview extends Component {
  state = {
    values: {
      nickname: "",
      review: "",
      rating: 0,
      stars:{
        1: "silver",
        2: "silver",
        3: "silver",
        4: "silver",
        5: "silver",
      }
    },
  };

  handleChange = (event) => {
    const {
      target: {value, name}
    }= event;
    
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      }
    })
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    
    const { handleAddSingleReview, productDetails } = this.props;
    const { review, rating } = this.state.values;
    
    handleAddSingleReview(productDetails.product_id, review, rating);
  };
  
  handleRating = (event) => {
    const newRatings = {};
    const {name} = event.target;
    const ratingValue = parseInt(name) + 1;
    Object.keys(this.state.values.stars).map((eachRating) => {
      if (eachRating <= ratingValue) {
        newRatings[eachRating] = "gold";
      }
      if (eachRating > ratingValue && eachRating <= 5) {
        newRatings[eachRating] = "silver"
      }
      return newRatings[eachRating];
    });
    
  
    this.setState({
      values: {
        ...this.state.values,
        rating: ratingValue,
        stars: {
          ...newRatings
        }
      }
    });
    
  };
  
  render() {
    return (
      <Fragment>
        <div className="add-review__container">
          <h3>Add a review</h3>
          <form>
            <div className="add-review__reviewDetails">
              <label htmlFor="review">
                Your review
                <div>
                  <textarea onChange={this.handleChange} name="review" id="review" cols="30" rows="10" />
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
                      <img onClick={(event) => this.handleRating(event)} name={index} key={index} src={SilverStar} alt=""/> :
                      <img onClick={(event) => this.handleRating(event)} name={index} key={index} src={GoldStar} alt=""/>)
                  })}
                </div>
              </label>
            </div>
            <div className="add-review__submit">
              <input onClick={(event) => this.handleSubmit(event)} value="Submit" type="submit"/>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default AddReview;
