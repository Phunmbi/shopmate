import React, { Component, Fragment } from 'react';
import './signin.scss';
import Modal from '../../components/Modal/index';
import FacebookColouredIcon from '../../images/facebook-coloured.svg';
import Loading from '../../components/Loading/index';

export class SignUp extends Component {
	state = {
		values: {
			Email: '',
			Password: '',
		},
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
		const {values} = this.state;
		this.setState( {
			values: {
				...values,
				[ placeholder ]: value,
			},
		} );
	};

	signinForm = () => {
		const { authLoading } = this.props;
		return (
			<div className="signin">
				<form onSubmit={this.handleSubmit}>
					<input
						type="email"
						onChange={this.handleChange}
						placeholder="Email"
						autoComplete="true"
					/>
					<input
						type="password"
						onChange={this.handleChange}
						placeholder="Password"
						minLength="7"
					/>
					<label htmlFor="remember">
						<input type="checkbox" name="remember" value="remember" defaultChecked /> Remember
					</label>
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
	}

	additionalOptions() {
		return (
			<div className="additional-options">
				<div className="additional-options__container">
					<div className="additional-options__alternative">
						<p>or sign in with</p>
						<div className="additional-options__facebook">
							<img src={FacebookColouredIcon} alt="Facebook" />
						</div>
					</div>
				</div>
			</div>
		);
	}
	render() {
		const { displayModal, handleCloseModal } = this.props;
		return (
			<Fragment>
				{displayModal ? (
					<Modal
						title="Sign In"
						height="220px"
						childForm={this.signinForm}
						additionalOptions={this.additionalOptions}
						handleCloseModal={handleCloseModal}
					/>
				) : null}
			</Fragment>
		);
	}
}

export default SignUp;
