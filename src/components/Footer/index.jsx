import React, {Component, Fragment} from 'react';
import TwitterIcon from '../../images/twitterIcon.svg';
import FacebookIcon from '../../images/facebookIcon.svg';
import PinterestIcon from '../../images/pinterestIcon.svg';
import InstagramIcon from '../../images/instagramIcon.svg';
import './Footer.scss';

export class Footer extends Component {
  render() {
    return (
			<Fragment>
				<div className="footer-main">
					<div className="footer-container">
						<div className="footer-container__categories">
							<h3>Women</h3>
							<h3>Men</h3>
							<h3>Kids</h3>
							<h3>Shoes</h3>
							<h3>Brands</h3>
						</div>
						<div className="footer-container__social">
							<div className="footer-container__socialIcons">
								<img src={InstagramIcon} alt="instagram" />
							</div>
							<div className="footer-container__socialIcons">
								<img src={PinterestIcon} alt="pinterest" />
							</div>
							<div className="footer-container__socialIcons">
								<img src={TwitterIcon} alt="twitter" />
							</div>
							<div className="footer-container__socialIcons">
								<img src={FacebookIcon} alt="facebook" />
							</div>
						</div>
						<div className="footer-container__information">© shopmate Ltd • Contact • Privacy Policy</div>
					</div>
				</div>
			</Fragment>
		);
  }
}

export default Footer;
