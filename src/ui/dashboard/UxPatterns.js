import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardTitle,
  CardBody,
  AggregateStatusCount,
  Button,
} from 'patternfly-react';
import Icon from 'ui/common/Icon';
import { hasAccess } from '@entando/utils';
import { Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { SUPERUSER_PERMISSION } from 'state/permissions/const';

import ViewPermissionNoticeOverlay from 'ui/dashboard/ViewPermissionNoticeOverlay';

import { ROUTE_PAGE_TEMPLATE_LIST, ROUTE_WIDGET_ADD, ROUTE_WIDGET_LIST } from 'app-init/router';

class UxPatterns extends Component {
  componentDidMount() {
    const { onDidMount, userPermissions } = this.props;
    if (hasAccess(SUPERUSER_PERMISSION, userPermissions)) {
      onDidMount();
    }
  }

  render() {
    const { isSuperuser } = this.props;

    return (
      <Card accented className="UxPatternsCard">
        <ViewPermissionNoticeOverlay viewPermissions={[SUPERUSER_PERMISSION]}>
          <CardTitle>
            <Icon size="lg" name="object-ungroup" background />
            <b><FormattedMessage id="menu.uxComponents" /></b>
            {isSuperuser && (
              <Button
                bsStyle="link"
                className="pull-right"
                componentClass={Link}
                to={ROUTE_WIDGET_ADD}
              >
                <Icon name="plus" />
                <FormattedMessage id="app.add" />
              </Button>
            )}
            <Clearfix />
          </CardTitle>
          <CardBody>
            <Icon size="lg" name="cube" />
            <AggregateStatusCount>
              {this.props.widgets}&nbsp;
              <Link to={ROUTE_WIDGET_LIST}>
                <FormattedMessage id="dashboard.uxComponents.mfeWidgets" />
              </Link>
            </AggregateStatusCount>
            <span className="separator" />
            <Icon size="lg" name="cube" />
            <AggregateStatusCount>
              {this.props.pageTemplates}&nbsp;
              <Link to={ROUTE_PAGE_TEMPLATE_LIST}>
                <FormattedMessage id="dashboard.uxComponents.pageTemplates" />
              </Link>
            </AggregateStatusCount>
          </CardBody>
        </ViewPermissionNoticeOverlay>
      </Card>
    );
  }
}

UxPatterns.propTypes = {
  onDidMount: PropTypes.func.isRequired,
  widgets: PropTypes.number.isRequired,
  pageTemplates: PropTypes.number.isRequired,
  isSuperuser: PropTypes.bool,
  userPermissions: PropTypes.arrayOf(PropTypes.string),
};

UxPatterns.defaultProps = {
  isSuperuser: true,
  userPermissions: [],
};

export default UxPatterns;
