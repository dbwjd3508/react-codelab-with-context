import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import {UserService} from '../services';
import { UserConsumer } from '../contexts/user-context';

class Login extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: "",
            email: ""
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleKeyPress(e) {
        if(e.charCode === 13){
            this.handleLogin();
        }
    }

    handleChange(e) {
        let nextState = {};

        nextState[e.target.name] = e.target.value;

        this.setState(nextState);
    }
    
    handleLogin() {
        let name=this.state.name;
        let email = this.state.email;
        
        return UserService.login(name, email).then(
            result => {
                
                if(result.data !== "null"){
                    let loginData = {
                        isLoggedIn: true,
                        username: name
                    };

                    document.cookie = 'key='+btoa(JSON.stringify(loginData));

                    Materialize.toast('Welcome, '+name+'!', 2000);
                    this.props.history.push('/');
                    return true;
                }
                else{
                    let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
                    Materialize.toast($toastContent, 2000);
                    return false;
                }
            }
        );
    }
    

    render () {
        return (
            <div className="container auth">
                <Link to="/" className="logo">USER-ADMIN</Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">LOGIN</div>
                    </div>
                    <div>
                        <div className="card-content">
                            <div className="row">
                                <div>
                                    <div className="input-field col s12 username">
                                        <label>Username</label>
                                        <input
                                        name="name"
                                        type="text"
                                        className="validate"
                                        onChange={this.handleChange}
                                        value={this.state.name}/>
                                    </div>
                                    <div className="input-field col s12">
                                        <label>Email</label>
                                        <input
                                        name="email"
                                        type="text"
                                        className="validate"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        onKeyPress={this.handleKeyPress}
                                        />
                                    </div>
                                </div>
                                <a className="waves-effect waves-light btn" onClick={this.handleLogin}>SUBMIT</a>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="card-content">
                                <div className="right" >
                                New Here? <Link to="/register">Create an account</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default withRouter(Login);