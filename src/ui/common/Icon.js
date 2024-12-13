/* eslint-disable react/prop-types */
import React from 'react';
import { Icon as PFIcon } from 'patternfly-react';

const publicUrl = process.env.PUBLIC_URL;

const SvgIcon = ({ src, alt, className }) => (
  <img src={`${publicUrl}${src}`} alt={alt} className={className} />
);

const Icon = ({ background, src, ...rest }) => (
  src
    ? <SvgIcon src={src} {...rest} />
    : <PFIcon {...rest} className={background && 'icon__colored-bg'} />);

export default Icon;
