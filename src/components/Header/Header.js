import React from "react";
import "./Header.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/auth";

const Header = props => {
    const logoutUser = () => {
        props.logout();
    };

    let header_links = null;

    if (props.isAuthenticated) {
        header_links = (
            <div>
                <Link to="/favorites/">Favorites</Link>
                <span> | </span>
                <Link to="/" onClick={() => logoutUser()}>
                    Log out
                </Link>
            </div>
        );
    } else {
        header_links = (
            <div>
                <Link to="/login/">Log in</Link>
                <span> | </span>
                <Link to="/register/">Register</Link>
            </div>
        );
    }

    return (
        <div className="HeaderContainer">
            <div className="HeaderItems">
                <div className="HeaderMiddle">
                    <Link to="/">{props.title}</Link>
                </div>
                <div className="HeaderRight">{header_links}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { logout }
)(Header);
