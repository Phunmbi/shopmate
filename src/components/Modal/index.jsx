import React, {Component, Fragment} from 'react';
import Multiply from '../../images/multiply.svg';
import './Modal.scss'

export class Modal extends Component {
  render () {
    const {
      childForm,
      height,
			title,
			additionalOptions,
			handleCloseModal,
			handleDisplayModal
		} = this.props;
    return (
			<Fragment>
				<div onClick={() => handleCloseModal()} className="modal-overlay" />
				<div className="modal-container">
					<div className="modal-main">
						<div className="modal-main__center">
							<div className="modal-main__title">
								<div className="modal-main__cancel">
									<img onClick={() => handleCloseModal()} src={Multiply} alt="Cancel" />
								</div>
								<h3>{title}</h3>
							</div>
							<div className="modal-main__body" style={{ height: height }}>
								{childForm()}
							</div>
							<div className="modal-main__additional">{additionalOptions(handleDisplayModal)}</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
  }
}

export default Modal;
