import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';

class Register extends Component {
    constructor (props) {
        super (props);
        //this.handleRegister = this.handleRegister.bind(this);
    }

    /*handleRegister(id, pw) {
        return this.props.registerRequest(id, pw).then(
            () => {
                if(this.props.status === "SUCCESS"){
                    Materialize.toast('Success! Please log in.', 2000);
                    this.props.history.push('/Login');
                    return true;
                }
                else{
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'
                    ];

                    let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }*/

    render () {
        return (
            <div className="container auth">
                <Link to="/" className="logo">USER-ADMIN</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode? "LOGIN" : "REGISTER"}</div>
                    </div>
                    <div className="card-content">
                        <div className="row">
                            <div>
                                <div className="input-field col s12 username">
                                    <label>Username</label>
                                    <input
                                    name="username"
                                    type="text"
                                    className="validate"/>
                                </div>
                                <div className="input-field col s12">
                                    <label>Email</label>
                                    <input
                                    name="email"
                                    type="text"
                                    className="validate"
                                    />
                                </div>
                                <div className="input-field col s12">
                                    <label>Phone</label>
                                    <input
                                    name="phone"
                                    type="text"
                                    className="validate"
                                    />
                                </div>
                            </div>
                            <a className="waves-effect waves-light btn">CREATE</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);