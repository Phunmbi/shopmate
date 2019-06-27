class Validation {
  static checkAllFields(input, field, errors) {
    switch (field) {
      case 'Name':
        return this.checkName(input, errors);
      case 'Email':
        return this.checkEmail(input, errors);
      case 'Password':
        return this.checkPassword(input, errors);
      case 'Address 1':
        return this.checkNotEmpty(input, errors, "Address 1");
      case 'City':
        return this.checkNotEmpty(input, errors, "City");
      case 'Region':
        return this.checkNotEmpty(input, errors, "Region");
      case 'Country':
        return this.checkNotEmpty(input, errors, "Country");
      case 'Postal Code':
        return this.checkNotEmpty(input, errors, "Postal Code");
      default:
        break;
    }
  }
  
  static checkName (input, errors) {
    if (input.trim().length < 1) {
      errors = {
        Name: 'Please enter a name'
      };
      return errors;
    }
     delete errors.Name;
  }
  
  static checkEmail (input, errors) {
    const regexEmailCheck = new RegExp(/\S+@\S+\.\S+/);
    if (!regexEmailCheck.test(input.trim())) {
      errors = {
        'Email': 'Please enter a valid email address'
      };
      return errors;
    }
    delete errors.Email;
  }
  
  static checkPassword (input, errors) {
    if (input.length < 7) {
      errors = {
        'Password': 'Please enter a password with at least 6 characters'
      };
      return errors;
    }
    delete errors.Password;
  }

  static checkNotEmpty (input, errors, field) {
    if (input.trim().length < 1) {
      errors = {
        [field]: `Please enter a valid ${[field]}`
      };
      return errors;
    }
    delete errors[field];
  }
}

export default Validation;
