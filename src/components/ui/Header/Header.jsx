import React, { useState, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    Collapse,
    NavItem,
} from "reactstrap";

import Icon from "../Icon/Icon";

import "./Header.scss";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const getHomeIsActiveClass = useCallback(() => {
        const { pathname } = location;
        return pathname === process.env.PUBLIC_URL ||
            pathname === process.env.PUBLIC_URL + "/"
            ? "active"
            : "";
    }, [location]);

    return (
        <header className="Header">
            <Navbar color="light" expand="md" light fixed="top" container="md">
                <NavbarBrand
                    to={process.env.PUBLIC_URL}
                    tag={Link}
                    onClick={closeMenu}
                >
                    <Icon icon="attach_money" />
                    Exchanger
                </NavbarBrand>
                <NavbarToggler onClick={toggleMenu} />
                <Collapse navbar isOpen={isOpen}>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <Link
                                to={process.env.PUBLIC_URL}
                                className={`nav-link ${getHomeIsActiveClass()}`}
                                onClick={closeMenu}
                            >
                                Currency Converter
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                end
                                to={`${process.env.PUBLIC_URL}/history`}
                                className="nav-link"
                                onClick={closeMenu}
                            >
                                Conversion History
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default Header;
