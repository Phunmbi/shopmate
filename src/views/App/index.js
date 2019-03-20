import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../routes';
import './App.scss';

class App extends Component {
  render() {
    return (
			<Fragment>
				<div className="App">
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
				</div>
			</Fragment>
		);
  }
}

export default App;
