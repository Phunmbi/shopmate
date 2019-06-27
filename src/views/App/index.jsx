import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from '../../routes';
import store from '../../redux/store';
import './App.scss';
import {getUser} from "../../redux/actionCreator/auth";
import '../../customStyles/toast.scss';

class App extends Component {
	componentDidMount() {
		getUser();
	}
	
	render() {
    return (
			<Fragment>
				<div className="App">
					<Provider store={store}>
						<BrowserRouter>
							<Routes />
						</BrowserRouter>
					</Provider>
				</div>
			</Fragment>
		);
  }
}

export default App;
