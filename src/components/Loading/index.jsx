import React, {Fragment} from 'react';
import LoadingGif from '../../images/loading_shopmate.gif';
import './Loading.scss';

const Loading = props => {
  const {size, height} = props;
  const loadingClass = `loading loading-${size}`
  return (
		<Fragment>
			<div style={{height: height}} className={loadingClass}>
				<img src={LoadingGif} alt="Loading" />
			</div>
		</Fragment>
	);
};

export default Loading
