import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

export class NotFound extends Component {
  render() {
    return (
			<Fragment>
				<div className="not-found">
					<p>
            Let's get you back
            <Link to="/"> Home </Link>
					</p>
				</div>
			</Fragment>
		);
  }
}

export default NotFound;