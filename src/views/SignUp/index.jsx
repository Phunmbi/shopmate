import React, {Component, Fragment} from 'react';
import './signup.scss';
import Modal from '../../components/Modal/index';
import Validation from '../../Helpers/validation';
import Loading from '../../components/Loading/index';

class SignUp extends Component {
	state = {
		values: {
			Name: '',
			Email: '',
			Password: '',
		},
		errors: {}
	};

	handleSubmit = event => {
		event.preventDefault();
		const {signupUser} = this.props;
		signupUser(this.state.values);
	};

	handleChange = event => {
		const {
			target: { value, placeholder },
		} = event;
		const { values, errors } = this.state;
		
		const validateField = Validation.checkAllFields(value, placeholder, errors);
		
		if (validateField) {
			this.setState({
				errors: {
					...errors,
					[placeholder]: validateField[placeholder],
				}
			})
		}
		
		this.setState({
			values: {
				...values,
				[placeholder]: value,
			}
		});
	};

	signupForm = () => {
		const {authLoading} = this.props;
		const {errors} = this.state;
		return (
			<div className="signup">
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} placeholder="Name" autoFocus />
					{Object.keys(errors).includes('Name') ? <p className="display-errors">{errors['Name']}</p> : null}
					<input
						type="email"
						onChange={this.handleChange}
						placeholder="Email"
						autoComplete="true"
					/>
					{Object.keys(errors).includes('Email') ? <p className="display-errors">{errors['Email']}</p> : null}
					<input
						type="password"
						onChange={this.handleChange}
						placeholder="Password"
						minLength="7"
					/>
					{Object.keys(errors).includes('Password') ? <p className="display-errors">{errors['Password']}</p> : null}
					{authLoading ? (
						<div className="submitButton loading">
							<Loading size="small" />
						</div>
					) : (
						<input type="submit" value="Sign Up" />
					)}
				</form>
			</div>
		);
	};

	additionalOptions = (handleDisplayModal) => {
		return (
			<div className="additional-options">
				<div className="additional-options__container">
					<div className="additional-options__alternative">
						<p>Already have an account? </p>
						<div className="additional-options__alternate">
							<p onClick={() => handleDisplayModal('signin')}>Sign in</p>
						</div>
					</div>
				</div>
			</div>
		);
	};
	
	render () {
		const { displayModal, handleCloseModal, handleDisplayModal } = this.props;
		return (
			<Fragment>
				{displayModal ? (
					<Modal
						title="Sign Up"
						height="270px"
						childForm={this.signupForm}
						additionalOptions={this.additionalOptions}
						handleCloseModal={handleCloseModal}
						handleDisplayModal={handleDisplayModal}
					/>
				) : null}
			</Fragment>
		);
	}
}

export default SignUp;
