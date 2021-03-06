import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./navbar-view.scss";

export function NavbarView(props) {
    return (
        <Navbar className="navigation" collapseOnSelect expand="md" bg="dark" variant="dark">
            <Navbar.Brand>JakesMovieDB</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Link to={"/myFlix-client"} className="nav-link">Movies</Link>
                    <Link to={"/myFlix-client/register"} className="nav-link">Register</Link>
                    <Link to={`/myFlix-client/users/${props.user}`} className="nav-link">View Profile</Link>
                    <Link to={"/myFlix-client"} onClick={() => { props.onLoggedOut(); }} className="nav-link">Logout</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}