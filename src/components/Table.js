import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {UserService} from '../services';
import { UserConsumer } from '../contexts/user-context';

class Table extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: []
        }

        this.listAllUsers = this.listAllUsers.bind(this);
    }

    componentDidMount() {
        this.setState({
            users: this.props.users
        });
        this.listAllUsers();
    }

    listAllUsers(){
        UserService
        .listuser()
        .then(result => {
            console.log(result);
            if(result.code !== "1000") throw new Error('Server response error!');

            this.setState({ users: JSON.parse(result.data) });

            this.props.listUser(this.state.users);
        });
    }

    render () {
        const columns = [{
            Header: 'name',
            accessor: 'name'
        }, {
            Header: 'phone',
            accessor: 'phone'
        }, {
            Header: 'email',
            accessor: 'email'
        }];

        return (
            <div className="col s12 center">
                <ReactTable data={this.state.users} columns={columns} defaultPageSize={10} className="-striped -highlight"/>
            </div>
        );
    }
}

const UserContainer = () => (
    <UserConsumer>
        {
            ({state, actions}) => (
                <Table
                users={state.users}
                listUser={actions.listUser}
                />
            )
        }
    </UserConsumer>
)

export default UserContainer;