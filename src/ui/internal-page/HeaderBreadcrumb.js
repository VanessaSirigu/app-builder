/* eslint-disable react/prop-types */
import React from 'react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import Icon from 'ui/common/Icon';
import { FormattedMessage } from 'react-intl';
import { createPortal } from 'react-dom';
import { Breadcrumb } from 'patternfly-react';

const HeaderBreadcrumb = ({ breadcrumbs, ...props }) => {
  const breadcrumbContainer = document.getElementById('header-breadcrumbs');
  if (!breadcrumbContainer) return <div />;

  return createPortal(
    <Breadcrumb {...props} >
      <BreadcrumbItem>
        <Icon
          src="/images/app-builder-icon.svg"
          alt="app builder"
          className="VerticalMenu__headerBreadcrumbs__icon"
        />
        <span>App Builder</span>
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
