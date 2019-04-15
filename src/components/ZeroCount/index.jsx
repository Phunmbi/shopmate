import React, {Component, Fragment} from 'react';
import './ZeroCount.scss';

class ZeroCount extends Component {
    render() {
        return (
            <Fragment>
                <div className="empty-search">
                    <h3>Nothing matching your search was found</h3>
                </div>
            </Fragment>
        );
    }
}

export default ZeroCount;
