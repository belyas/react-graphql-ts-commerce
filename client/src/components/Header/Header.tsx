import React from 'react';
import { NavLink } from 'react-router-dom';

import CartMenu from '../../containers/Cart/CartMenu/CartMenu';
import { IHeaderProps } from '../../types';

const Header: React.FC<IHeaderProps> = ({ isAuthenticated }: IHeaderProps) => {
  return (
    <header>
      <div className="navbar navbar-expand-md navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          Node commerce
        </NavLink>

        <ul className="nav ml-auto navbar-nav">
          {!isAuthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
          {isAuthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <CartMenu />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
