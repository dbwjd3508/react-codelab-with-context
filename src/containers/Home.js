import React, {Component} from 'react';
import { Header, Table } from 'components';

class Home extends Component {
    render () {
        return (
            <div>
                <Header />
                <div className="row">
                    <div className="col s12 m12 l12">
                            <Table />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;