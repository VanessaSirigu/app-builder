/* eslint-disable react/prop-types */
import React from 'react';
import { Icon as PFIcon } from 'patternfly-react';

const Icon = ({ background, ...rest }) => (
  <PFIcon {...rest} className={background && 'icon__colored-bg'} />
);

export default Icon;
