import React, {Component, Fragment} from 'react';
import './signup.scss';
import Modal from '../../components/Modal/index';
import FacebookColouredIcon from '../../images/facebook-coloured.svg';
import Loading from '../../components/Loading/index';

class SignUp extends Component {
	state = {
		values: {
			Name: '',
			Email: '',
			Password: '',
		},
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
		const { values } = this.state;
		this.setState({
			values: {
				...values,
				[placeholder]: value,
			},
		});
	};

	signupForm = () => {
		const {authLoading} = this.props;
		return (
			<div className="signup">
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} placeholder="Name" autoFocus />
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

	additionalOptions = () => {
		return (
			<div className="additional-options">
				<div className="additional-options__container">
					<div className="additional-options__alternative">
						<p>or sign in with</p>
						<div className="additional-options__facebook">
							<img onClick={() => this.FacebookLogin()} src={FacebookColouredIcon} alt="Facebook" />
						</div>
					</div>
				</div>
			</div>
		);
	}
	render () {
		const { displayModal, handleCloseModal } = this.props;
		return (
			<Fragment>
				{displayModal ? (
					<Modal
						title="Sign Up"
						height="220px"
						childForm={this.signupForm}
						additionalOptions={this.additionalOptions}
						handleCloseModal={handleCloseModal}
					/>
				) : null}
			</Fragment>
		);
	}
}

export default SignUp;
