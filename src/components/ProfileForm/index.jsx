import React, {Component, Fragment} from 'react';
import './ProfileForm.scss';
import Validation from "../../Helpers/validation";

class ProfileForm extends Component {
  state = {
    values: {
      'Address 1': '',
      'Address 2': '',
      City: '',
      Region: '',
      Country: '',
      'Postal Code': '',
      'Shipping Region': '',
    },
    errors: {}
  };

  componentDidMount() {
    const { getShippingRegions, getUser } = this.props;
    getShippingRegions();
    getUser();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { userDetails } = this.props;
    if (prevProps.userDetails !== this.props.userDetails) {
      this.setState({
        ...this.state,
        values: {
          'Address 1': userDetails.address_1,
          'Address 2': userDetails.address_2,
          City: userDetails.city,
          Region: userDetails.region,
          Country: userDetails.country,
          'Postal Code': userDetails.postal_code,
        }
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const {updateUser, history} = this.props;
    console.log(this.state.values);

    updateUser({
      address_1: this.state.values['Address 1'],
      address_2: this.state.values['Address 2'],
      city: this.state.values.City,
      region: this.state.values.Region,
      country: this.state.values.Country,
      postal_code: this.state.values['Postal Code'],
      shipping_region_id: this.state.values['Shipping Region'],
      history
    });
  };

  handleChange = event => {
    const {
      target: {value, title},
    } = event;
    const {values, errors} = this.state;

    const validateField = Validation.checkAllFields(value, title, errors);

    if (validateField) {
      this.setState({
        errors: {
          ...errors,
          [title]: validateField[title],
        }
      })
    }

    this.setState( {
      values: {
        ...values,
        [ title ]: value,
      },
    } );
  };

  handleSelectRegion = (e) => {
    this.setState( {
      ...this.state,
      values:{
        ...this.state.values,
        'Shipping Region': e.currentTarget.value
      }
    });
  };

  renderRegions = (shippingRegions) => {
    return shippingRegions.map((region) => {
      return <option key={region.shipping_region_id} value={region.shipping_region_id} label={region.shipping_region}>
        {region.shipping_region}
      </option>
    });
  };

  render() {
    const { errors } = this.state;
    const { shippingRegions } = this.props;
    return (
      <Fragment>
        <div className="profile-form">
          <form onSubmit={this.handleSubmit}>
            <input placeholder="Name" type="text" value={localStorage.getItem("name")} disabled={true}/>
            <input
              title="Address 1"
              placeholder={this.state.values['Address 1'] ? this.state.values['Address 1'] :  "Address 1"}
              type="text"
              onChange={this.handleChange}
            />
            {Object.keys(errors).includes('Address 1') ? <p className="display-errors">{errors['Address 1']}</p> : null}
            <input
              title="Address 2"
              placeholder={this.state.values['Address 2'] ? this.state.values['Address 2'] :  "Address 2"}
              type="text"
              onChange={this.handleChange}
            />
            <div className="profile-form__location">
              <input
                title="City"
                placeholder={this.state.values.City ? this.state.values.City :  "City"}
                type="text"
                onChange={this.handleChange}
              />
              {Object.keys(errors).includes('City') ? <p className="display-errors">{errors['City']}</p> : null}
              <input
                title="Region"
                placeholder={this.state.values.Region ? this.state.values.Region :  "Region"}
                type="text"
                onChange={this.handleChange}
              />
              {Object.keys(errors).includes('Region') ? <p className="display-errors">{errors['Region']}</p> : null}
              <input
                title="Country"
                placeholder={this.state.values.Country ? this.state.values.Country :  "Country"}
                type="text"
                onChange={this.handleChange}
              />
              {Object.keys(errors).includes('Country') ? <p className="display-errors">{errors['Country']}</p> : null}
            </div>
            <div className="profile-form__shipping">
              <input
                title="Postal Code"
                placeholder={this.state.values["Postal Code"] ? this.state.values["Postal Code"] :  "Postal Code"}
                type="text"
                onChange={this.handleChange}
              />
              {Object.keys(errors).includes('Postal Code') ? <p className="display-errors">{errors['Postal Code']}</p> : null}
              <select
                onChange={(e) => this.handleSelectRegion(e)}
                value={this.state.selectedShippingRegion}
                name="shipping-region"
              >
                {this.renderRegions(shippingRegions)}
              </select>
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default ProfileForm;