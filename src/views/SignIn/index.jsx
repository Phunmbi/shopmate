import React, { Component, Fragment } from 'react';
import './signin.scss';
import Modal from '../../components/Modal/index';
import Loading from '../../components/Loading/index';
import Validation from "../../Helpers/validation";

export class SignUp extends Component {
	state = {
		values: {
			Email: '',
			Password: '',
		},
		errors: {}
	};

	handleSubmit = event => {
		event.preventDefault();
		const {signInUser} = this.props;
		signInUser(this.state.values);
	};

	handleChange = event => {
		const {
			target: {value, placeholder},
		} = event;
		const {values, errors} = this.state;
		
		const validateField = Validation.checkAllFields(value, placeholder, errors);
		
		if (validateField) {
			this.setState({
				errors: {
					...errors,
					[placeholder]: validateField[placeholder],
				}
			})
		}
		
		this.setState( {
			values: {
				...values,
				[ placeholder ]: value,
			},
		} );
	};

	signInForm = () => {
		const { authLoading } = this.props;
		const { errors } = this.state;
		return (
			<div className="signin">
				<form onSubmit={this.handleSubmit}>
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
					<label htmlFor="remember">
						<input type="checkbox" name="remember" value="remember" defaultChecked /> Remember
					</label>
					{authLoading ? (
						<div className="submitButton loading">
							<Loading size="small" />
						</div>
					) : (
							<input type="submit" value="Sign In" />
						)}
				</form>
			</div>
		);
	};

	additionalOptions(handleDisplayModal) {
		return (
			<div className="additional-options">
				<div className="additional-options__container">
					<div className="additional-options__alternative">
						<p>Don't have an account? </p>
						<div className="additional-options__alternate">
							<p onClick={() => {handleDisplayModal('signup')}}>Sign up</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
	render() {
		const { displayModal, handleCloseModal, handleDisplayModal } = this.props;
		return (
			<Fragment>
				{displayModal ? (
					<Modal
						title="Sign In"
						height="220px"
						childForm={this.signInForm}
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
