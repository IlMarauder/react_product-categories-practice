/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const FILTER_FIELD_ACTIVE = {
  active: {
    roma: 'Roma',
    anna: 'Anna',
    max: 'Max',
    john: 'John',
  },
  allPerson: 'All person',
  allCategories: 'All catgories',
};
const SORT_BY_FIELDS = {
  id: 'Id',
  product: 'Product',
  category: 'Category',
  user: 'User',
};

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    group => group.id === product.categoryId,
  );
  const user = usersFromServer.find(person => person.id === category.ownerId);

  return { ...product, category, user };
});

function filterAndSortProducts(production, params) {
  const { query, sortBy, filterField } = params;
  let preparedProducts = [...production];

  if (query) {
    preparedProducts = preparedProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase),
    );
  }

  if (filterField) {
    preparedProducts = preparedProducts.filter(product =>
      product.toLowerCase().includes(filterField.toLowerCase()),
    );
  }

  if (sortBy) {
    preparedProducts = preparedProducts.toSorted((product1, product2) => {
      switch (sortBy) {
        case SORT_BY_FIELDS.id:
          return product1 - product2;

        case SORT_BY_FIELDS.product:
        case SORT_BY_FIELDS.category:
        case SORT_BY_FIELDS.user:
          return product1[sortBy].localeCompare(product2[sortBy]);

        default:
          return 0;
      }
    });
  }

  return preparedProducts;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [filterField, setFilterField] = useState('');
  const onReset = () => {
    setQuery('');
    setSortBy(null);
    setFilterField('');
  };

  const filteredOrSortedProducts = filterAndSortProducts(products, {
    query,
    sortBy,
    filterField,
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({
                  'is-active': filterField === FILTER_FIELD_ACTIVE.allPerson,
                })}
                onClick={() => setFilterField(FILTER_FIELD_ACTIVE.allPerson)}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({
                  'is-active': filterField === FILTER_FIELD_ACTIVE.active.roma,
                })}
                onClick={() => setFilterField(FILTER_FIELD_ACTIVE.active.roma)}
              >
                Roma
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({
                  'is-active': filterField === FILTER_FIELD_ACTIVE.active.anna,
                })}
                onClick={() => setFilterField(FILTER_FIELD_ACTIVE.active.anna)}
              >
                Anna
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({
                  'is-active': filterField === FILTER_FIELD_ACTIVE.active.max,
                })}
                onClick={() => setFilterField(FILTER_FIELD_ACTIVE.active.max)}
              >
                Max
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className={cn({
                  'is-active': filterField === FILTER_FIELD_ACTIVE.active.john,
                })}
                onClick={() => setFilterField(FILTER_FIELD_ACTIVE.active.john)}
              >
                John
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                  }}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={onReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrSortedProducts.map(item => (
                <tr data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {item.id}
                  </td>

                  <td data-cy="ProductName">{item.name}</td>
                  <td data-cy="ProductCategory">{`${item.category.icon} - ${item.category.title}`}</td>

                  <td
                    data-cy="ProductUser"
                    className={cn(
                      item.user.sex === 'm'
                        ? 'has-text-link'
                        : 'has-text-danger',
                    )}
                  >
                    {item.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
