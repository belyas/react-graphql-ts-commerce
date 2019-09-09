import React from 'react';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'reactstrap';

import { IMenuCategories } from '../../types';

const Menu = ({ loading, categories = [] }: IMenuCategories) => {
  return (
    <div className="navbar navbar-expand-md navbar-light bg-light justify-content-center">
      <ul className="nav">
        {loading && <Spinner size="sm" color="primary" />}
        {!!categories.length &&
          categories.map(({ _id, name }) => {
            return (
              <li className="nav-item" key={_id}>
                <NavLink className="nav-link" to={`/category/${_id}`}>
                  {' '}
                  {name}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Menu;
