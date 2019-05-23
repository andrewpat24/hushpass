import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// Styles
import "../styles/components/header.css";

class Header extends Component {
  render() {
    let AuthState = this.props.auth;
    return (
      <section className="Header">
        <div className="header-container">
          <div className="header row">
            <div className="nav-group nav-left row">
              <div className="nav-item logo">
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  <span className="brand-dark">Hush</span>
                  <span className="brand-white">Hush</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header);
