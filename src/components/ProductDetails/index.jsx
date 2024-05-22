import React, {Component, Fragment} from 'react';
import Minus from '../../images/minus.svg'
import Plus from '../../images/plus.svg'
import Heart from '../../images/heart.svg';
import Blue from '../../images/blue.svg';
import Teal from '../../images/teal.svg';
import Red from '../../images/red.svg';
import Orange from '../../images/orange.svg';
import Yellow from '../../images/yellow.svg';
import Green from '../../images/green.svg';
import Purple from '../../images/purple.svg';
import GoldStar from '../../images/gold 4.svg';
import SilverStar from '../../images/grey 1.svg';
import './ProductDetails.scss';

class ProductDetails extends Component {
  state = {
    colours: {
      blue: Blue,
      teal: Teal,
      red: Red,
      orange: Orange,
      yellow: Yellow,
      green: Green,
      purple: Purple
    },
    currentImage: null
  };
  
    componentDidMount () {
    const { productDetails, singleProductLoading } = this.props;

    if (singleProductLoading === false)  {
      this.setState({
        ...this.state,
        currentImage: productDetails.image
      });
    }
  }
  
  renderRatings = () => {
    const {averageRating} = this.props;
    const goldStars = [];
    const silverStars = [];

    for (let i = 0; i < averageRating; i++) {
      goldStars.push(GoldStar);
    }

    for (let i = 0; i < 5 - averageRating; i++) {
      silverStars.push(SilverStar);
    }
    return [...goldStars, ...silverStars];
  };

  render() {
    const {
      productDetails,
      quantity,
      increaseQuantity,
      reduceQuantity,
      sizeSelector,
      selectedSize,
      selectedColour,
      colourSelector,
      handleAddToCart
    } = this.props;

    const srcImage = image => `https://backendapi.turing.com/images/products/${image}`;
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    return (
      <Fragment>
        {
          <div className="product-details__main">
            <div className="product-details__container">
              <div className="product-details__imageContainer">
                <div className="product-details__mainImage">
                  <img src={srcImage(this.state.currentImage)} alt=""/>
                </div>
                <div className="product-details__thumbnails">
                  <img onMouseOver={() => this.setState({currentImage: productDetails.thumbnail})} src={srcImage(productDetails.thumbnail)} alt=""/>
                  <img onMouseOver={() => this.setState({currentImage: productDetails.image_2})} src={srcImage(productDetails.image_2)} alt=""/>
                </div>
              </div>
              <div className="product-details__details">
                <div className="product-details__ratings">
                  {this.renderRatings().map((eachRating, index) => {
                    return <img key={index} src={eachRating} alt=""/>
                  })}
                </div>
                <h3>{productDetails.name}</h3>
                {productDetails.discounted_price === "0.00" ?
                  (
                    <h3 className="product-details__price">£{productDetails.price}</h3>
                  ) :
                  (
                    <div className="product-details__prices">
                      <h3 className="product-details__discountedPrice">£{productDetails.price}</h3>
                      <h3 className="product-details__price">£{productDetails.discounted_price}</h3>
                    </div>
                  )
                }
                <div className="product-details__color">
                  <h4>Color</h4>
                  <div onClick={(event) => colourSelector(event)} className="product-details__eachColor">
                    {
                      Object.keys(this.state.colours).map(colour => {
                        if (colour === selectedColour) return <img key={colour} className="product-details__selectedColor" src={this.state.colours[colour]} alt={colour} />;
                        return <img key={colour} src={this.state.colours[colour]} alt={colour} />
                      })
                    }
                  </div>
                </div>
                <div className="product-details__sizeMenu">
                  <div className="product-details__sizes">
                    <h3>Size</h3>
                    <p>Size guide</p>
                  </div>
                  <div onClick={(event) => sizeSelector(event)} className="product-details__sizeButton">
                    {
                      sizes.map(size => {
                        if (size === selectedSize) return <div key={size} className="product-details__eachSizeSelected">{size}</div>;
                        return <div key={size} className="product-details__eachSize">{size}</div>
                      })
                    }
                  </div>
                </div>
                <div className="product-details__quantity">
                  <h3>Quantity</h3>
                  <div className="product-details__quantityClicker">
                    <img onClick={() => reduceQuantity()} src={Minus} alt=""/>
                    <div className="product-details__count">
                      <p>{quantity}</p>
                    </div>
                    <img onClick={() => increaseQuantity()} src={Plus} alt=""/>
                  </div>
                </div>
                <div className="product-details__action">
                  <button onClick={() => handleAddToCart()}>Add to Cart</button>
                  <div className="product-details__wishList">
                    <img src={Heart} alt=""/>
                    <p>Add to Wish List</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </Fragment>
    );
  }
}

export default ProductDetails;
