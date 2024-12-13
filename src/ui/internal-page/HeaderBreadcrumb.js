/* eslint-disable react/prop-types */
import React from 'react';
import { Breadcrumb } from 'patternfly-react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { FormattedMessage } from 'react-intl';
import { createPortal } from 'react-dom';

const HeaderBreadcrumb = ({ breadcrumbs, ...props }) => {
  const breadcrumbContainer = document.getElementById('header-breadcrumbs');
  if (!breadcrumbContainer) return <div />;

  return createPortal(
    <Breadcrumb {...props} >
      <BreadcrumbItem>
        App Builder
      </BreadcrumbItem>
      {breadcrumbs.map(({ label, ...rest }) => (
        <BreadcrumbItem key={label} {...rest} >
          <FormattedMessage id={label} />
        </BreadcrumbItem>))}
    </Breadcrumb>,
    breadcrumbContainer,
  );
};

export default HeaderBreadcrumb;
