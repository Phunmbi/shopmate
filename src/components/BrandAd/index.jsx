import React, {Component, Fragment} from 'react';
import './BrandAd.scss';

export class BrandAd extends Component {
  render() {
    return (
			<Fragment>
				<div className="brand-ad">
					<div className="brand-ad__main">
						<h3>Converse</h3>
						<p>Explore styles tough enough to handle all your workouts</p>
						<button>Shop Converse</button>
					</div>
				</div>
			</Fragment>
		);
  }
}

export default BrandAd;
