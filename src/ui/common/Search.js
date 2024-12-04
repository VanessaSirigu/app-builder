import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

const Search = ({
  input, reverse, ...rest
}) => (
  <div className={`Search ${reverse && 'reverse'}`}>
    <input {...input} {...rest} />
    <Icon name="search" />
  </div>
);

Search.propTypes = {
  input: PropTypes.objectOf({}),
  reverse: PropTypes.bool,
};

Search.defaultProps = {
  input: {},
  reverse: false,
};

export default Search;
