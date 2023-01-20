import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Grid, Row, Col, Breadcrumb, MenuItem, Button, Paginator, Spinner } from 'patternfly-react';
import { Link } from 'react-router-dom';

import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import LabelSearchFormContainer from 'ui/labels/list/LabelSearchFormContainer';
import InternalPage from 'ui/internal-page/InternalPage';
import PageTitle from 'ui/internal-page/PageTitle';
import LanguageFormContainer from 'ui/labels/list/LanguageFormContainer';
import LabelsTabsContainer from 'ui/labels/list/LabelsTabsContainer';
import { ROUTE_LABEL_ADD } from 'app-init/router';
import paginatorMessages from 'ui/paginatorMessages';

const TAB_LANGUAGES = 'languages';
const TAB_LABELS = 'labels';

class LabelsAndLanguagesPage extends Component {
  constructor(props) {
    super(props);
    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  render() {
    let pageContent;

    const {
      activeTab, loadingLangs, page, pageSize, intl,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50],
    };

    if (activeTab === TAB_LANGUAGES) {
      pageContent = (
        <Spinner loading={!!loadingLangs}>
          <LanguageFormContainer />
        </Spinner>
      );
    } else {
      const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
        { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
      ), {});

      pageContent = (
        <Row>
          <Col xs={12}>
            <Row>
              <Col xs={6} xsOffset={3}>
                <LabelSearchFormContainer />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Link to={ROUTE_LABEL_ADD}>
                  <Button
                    type="button"
                    className="pull-right LabelsAndLanguagesPage__add-label"
                    bsStyle="primary"
                  >
                    <FormattedMessage
                      id="app.add"
                    />
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Spinner loading={!!this.props.loadingLabels}>
                  <LabelsTabsContainer />
                  <Paginator
                    pagination={pagination}
                    viewType="table"
                    itemCount={this.props.totalItems}
                    onPageSet={this.changePage}
                    onPerPageSelect={this.changePageSize}
                    messages={messages}
                  />
                </Spinner>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
    return (
      <InternalPage className="LabelsAndLanguagesPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <FormattedMessage id="menu.settings" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.labelsAndLanguages" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="LabelsAndLanguagesPage__header-container">
                <Row>
                  <Col xs={6}>
                    <PageTitle titleId="menu.labelsAndLanguages" helpId="labelsAndLanguages.help" />
                  </Col>
                  <Col xs={6}>
                    <ul className="nav nav-tabs nav-justified nav-tabs-pattern">
                      <MenuItem
                        className="LabelsAndLanguagesPage__header-tab LabelsAndLanguagesPage__header-tab-languages"
                        active={this.props.activeTab === TAB_LANGUAGES}
                        onClick={() => this.props.onClickTab(TAB_LANGUAGES)}
                      >
                        <FormattedMessage id="app.languages" />
                      </MenuItem>
                      <MenuItem
                        className="LabelsAndLanguagesPage__header-tab  LabelsAndLanguagesPage__header-tab-labels"
                        active={this.props.activeTab === TAB_LABELS}
                        onClick={() => this.props.onClickTab(TAB_LABELS)}
                      >
                        <FormattedMessage id="app.systemLabels" />
                      </MenuItem>
                    </ul>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          {pageContent}
        </Grid>
      </InternalPage>
    );
  }
}

LabelsAndLanguagesPage.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  loadingLabels: PropTypes.bool,
  loadingLangs: PropTypes.bool,
  activeTab: PropTypes.string,
  onClickTab: PropTypes.func.isRequired,
};

LabelsAndLanguagesPage.defaultProps = {
  onWillMount: null,
  loadingLabels: false,
  loadingLangs: false,
  activeTab: TAB_LANGUAGES,
};

export default injectIntl(LabelsAndLanguagesPage);
