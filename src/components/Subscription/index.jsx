import React, {Component, Fragment} from 'react';
import Message from '../../images/message.svg';
import './Subscription.scss';

export class Subscription extends Component {
  render() {
    return (
			<Fragment>
				<div className="subscription">
					<div className="subscription__main">
						<h3>SUBSCRIBE FOR SHOP NEWS, UPDATES AND SPECIAL OFFERS</h3>
						<div className="subscription__input">
							<img src={Message} alt="message-icon" />
							<input type="text" placeholder="Your e-mail here" />
						</div>
						<button>Subscribe</button>
					</div>
				</div>
			</Fragment>
		);
  }
}

export default Subscription;
