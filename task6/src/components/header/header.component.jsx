import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './header.module.scss';

const Header = () => {
    return (
        <div className={classes.header}>
            <NavLink className={classes.link} activeClassName={classes.active} to="/" exact>
                HOMEPAGE
            </NavLink>
            <NavLink className={classes.link} activeClassName={classes.active} to="/employees">
                EMPLOYEES
            </NavLink>
        </div>
    )
}

export default Header;
