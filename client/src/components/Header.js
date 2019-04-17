import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {

    renderContent() {
        let isLoggedIn = !!this.props.auth
    
        switch (isLoggedIn) {
            case false: 
                return (
                    <Fragment>
                        <li> <a href="/api/auth/google">Login with Google</a> </li>
                    </Fragment>
                );
            default: 
                return (
                    <Fragment>
                        <li > <a href="/api/auth/logout">Logout</a> </li>
                    </Fragment>
                );
        }

    }

    render () {
 
        let AuthState = this.props.auth;
        return (
            <nav>
                <div className="nav-wrapper" >
                        
                    <Link to={AuthState ? '/' : '/'} className="left brand-logo">
                        HushPass
                    </Link>
                    
                    <ul className="right">
                        
                        { this.renderContent() }
                        
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { 
        auth: state.auth
    };
} 

export default connect(mapStateToProps)(Header);