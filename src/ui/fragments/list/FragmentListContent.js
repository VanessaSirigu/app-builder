import React from 'react';
import { Row, Col, Button } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ROUTE_FRAGMENT_ADD } from 'app-init/router';
import FragmentListTableContainer from './FragmentListTableContainer';

const FragmentListContent = () => (
  <div className="FragmentListContent">
    <Row>
      <FragmentListTableContainer />
    </Row>
    <br />
    <Row>
      <Col xs={12}>
        <Link to={ROUTE_FRAGMENT_ADD}>
          <Button
            type="button"
            className="pull-right FragmentListContent__add"
            bsStyle="primary"
          >
            <FormattedMessage
              id="app.add"
            />
          </Button>
        </Link>
      </Col>
    </Row>
  </div>

);
export default FragmentListContent;
