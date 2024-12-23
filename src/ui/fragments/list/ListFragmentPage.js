import React, { Component } from 'react';
import { Grid, Row, Col } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import SettingsFragmentFormContainer from 'ui/fragments/list/SettingsFragmentFormContainer';
import FragmentSearchFormContainer from 'ui/fragments/list/FragmentSearchFormContainer';
import FragmentListContent from 'ui/fragments/list/FragmentListContent';
import withPermissions from 'ui/auth/withPermissions';
import Button from 'ui/common/Button';
import Icon from 'ui/common/Icon';
import { SUPERUSER_PERMISSION } from 'state/permissions/const';
import { Link } from 'react-router-dom';
import { ROUTE_FRAGMENT_ADD } from 'app-init/router';

const VIEW_LIST = 'list';
const VIEW_SETTINGS = 'settings';

export class ListFragmentPageBody extends Component {
  constructor(props) {
    super(props);
    this.setActiveView = this.setActiveView.bind(this);

    this.state = {
      activeView: VIEW_LIST,
    };
  }

  setActiveView(activeView) {
    this.setState({ activeView });
  }

  renderContent() {
    return this.state.activeView === VIEW_LIST
      ? <FragmentListContent />
      : <SettingsFragmentFormContainer />;
  }

  render() {
    return (
      <InternalPage className="ListFragmentPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents' },
          { label: 'menu.fragments', active: true },
        ]}
        />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <PageTitle
                titleId="fragment.list.title"
                helpId="fragment.help"
                className="max-height"
              >
                <div className="ListFragmentPage__search-container">
                  <FragmentSearchFormContainer />
                </div>
              </PageTitle>
            </Col>
          </Row>
          <Row >
            <div className="ListFragmentPage__btn-container">
              <Link to={ROUTE_FRAGMENT_ADD}>
                <Button
                  type="button"
                  className="pull-right FragmentListContent__add"
                  bsStyle="link"
                >
                  <FormattedMessage
                    id="app.add"
                  />
                </Button>
              </Link>
              <Button
                className="ListFragmentPage__header-btn clear secondary"
                active={this.state.activeView === VIEW_LIST}
                onClick={() => this.setActiveView(VIEW_LIST)}
              >
                <Icon name="list" />
                <FormattedMessage id="app.list" />
              </Button>
              <Button
                className="ListFragmentPage__header-btn clear secondary"
                active={this.state.activeView === VIEW_SETTINGS}
                onClick={() => this.setActiveView(VIEW_SETTINGS)}
              >
                <Icon name="gear" />
                <FormattedMessage id="app.settings" />
              </Button>
            </div>
          </Row>
          <Row>
            {this.renderContent()}
          </Row>
        </Grid>
      </InternalPage>
    );
  }
}

export default withPermissions(SUPERUSER_PERMISSION)(ListFragmentPageBody);
