import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Homepage from '../views/Homepage';
import NotFound from '../views/Not Found'
import allRoutes from './routes';

const Routes = () => (
	<Switch>
		<Route path="/" exact component={Homepage} />
		<Route>
			<Switch>
				{Object.keys(allRoutes).map(route => {
					const [component, ...otherProps] = allRoutes[route];
					return <Route path={route} key={route} exact {...otherProps} component={component} />;
				})}
				<Route component={NotFound} />
			</Switch>
		</Route>
	</Switch>
);

export default Routes;
