import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Breadcrumb } from 'patternfly-react';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import Icon from 'ui/common/Icon';

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
      {breadcrumbs.map(({ label, customLabel = '', ...rest }) => (
        <BreadcrumbItem key={label} {...rest} >
          {label && <FormattedMessage id={label} />}
          {customLabel && { customLabel }}
        </BreadcrumbItem>))}
    </Breadcrumb>,
    breadcrumbContainer,
  );
};

HeaderBreadcrumb.propTypes = {
  breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    to: PropTypes.string,
    active: PropTypes.boolean,
    customLabel: PropTypes.string,
  })).isRequired,

};


export default HeaderBreadcrumb;
