import React from 'react';
import { Breadcrumb } from 'patternfly-react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { FormattedMessage } from 'react-intl';
import { createPortal } from 'react-dom';

const HeaderBreadcrumb = ({ breadcrumbs, ...props }) => createPortal(
  <Breadcrumb {...props} >
    <BreadcrumbItem>
      App Builder
    </BreadcrumbItem>
    {breadcrumbs.map(({ label, ...rest }) => (
      <BreadcrumbItem key={label} {...rest} >
        <FormattedMessage id={label} />
      </BreadcrumbItem>))}
  </Breadcrumb>,
  document.getElementById('header-breadcrumbs'),
);

export default HeaderBreadcrumb;
