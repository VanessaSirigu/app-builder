import React from 'react';
import PropTypes from 'prop-types';
import { Button as PatternFlyButton } from 'patternfly-react';

const Button = ({ children, className, ...rest }) => (
  <PatternFlyButton {...rest} className={`Button ${className}`}>{children}</PatternFlyButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};


export default Button;
