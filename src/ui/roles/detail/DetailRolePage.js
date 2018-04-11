import React from 'react';
import { Grid, Row, Col, Breadcrumb } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { BreadcrumbItem } from 'frontend-common-components';

import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import DetailRoleContainer from 'ui/roles/detail/DetailRoleContainer';

const DetailRolePage = () => (
  <InternalPage className="DetailRolePage">
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <Breadcrumb>
            <BreadcrumbItem>
              <FormattedMessage id="menu.configuration" />
            </BreadcrumbItem>
            <BreadcrumbItem >
              <FormattedMessage id="menu.roles" />
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <FormattedMessage id="app.details" />
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <PageTitle
            titleId="app.details"
            helpId="role.help"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <DetailRoleContainer />
        </Col>
      </Row>
    </Grid>
  </InternalPage>
);

export default DetailRolePage;
