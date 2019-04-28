class Validation {
  static checkAllFields(input, field, errors) {
    switch (field) {
      case 'Name':
        return this.checkName(input, errors);
      case 'Email':
        return this.checkEmail(input, errors);
      case 'Password':
        return this.checkPassword(input, errors);
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
}

export default Validation;
