import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {

    render() {
        const loginButton = (
            <li>
                <Link to="/Login">
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );
    
        const logoutButton = (
            <li>
                <a>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );

        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link to="/" className="brand-logo center">USER-ADMIN</Link>
                    <ul>
                    <li><a><i className="material-icons">search</i></a></li>
                    </ul>
                    <div className="right">
                        <ul>
                            {this.props.isLoggedIn ? logoutButton : loginButton}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};


export default Header;