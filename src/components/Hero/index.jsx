import React, {Component, Fragment} from 'react'
import './Hero.scss';

export class Hero extends Component {
  render() {
    return (
			<Fragment>
				<div className="hero-section">
          <div className="hero-section__main">
            <h2>Men's wears</h2>
            <p>Jackets</p>
            <p>Suits</p>
            <p>Trousers</p>
            <p>Vests</p>
          </div>
				</div>
			</Fragment>
		);
  }
}

export default Hero;
