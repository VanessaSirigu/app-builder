import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import PageTitle from 'ui/internal-page/PageTitle';
import { Grid, Row, Col, Button, Breadcrumb, Spinner, PaginationRow } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import BreadcrumbItem from 'ui/common/BreadcrumbItem';
import { ROUTE_WIDGET_ADD } from 'app-init/router';
import DeleteWidgetModalContainer from 'ui/widgets/list/DeleteWidgetModalContainer';

class ListWidgetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageInputValue: props.page,
    };

    this.changePage = this.changePage.bind(this);
    this.changePageSize = this.changePageSize.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handlePageInput = this.handlePageInput.bind(this);
  }

  componentWillMount() {
    const { onWillMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['titles', 'code', 'used']);
    }
    onWillMount(this.props);
  }


  changePage(page) {
    this.props.onWillMount({ page, pageSize: this.props.pageSize });

    this.setState({ pageInputValue: page });
  }

  changePageSize(pageSize) {
    this.props.onWillMount({ page: 1, pageSize });
  }

  handleFormSubmit() {
    this.changePage(this.state.pageInputValue);
  }

  handlePageInput(e) {
    this.setState({ pageInputValue: e.target.value });
  }

  renderTable() {
    const {
      groupedWidgets,
      widgetGroupingList,
      onDelete,
      onEdit,
      onNewUserWidget,
      locale,
      columnOrder,
      onSetColumnOrder,
      totalItems,
      page, pageSize,
      lastPage,
    } = this.props;

    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50, 100, 150],
    };

    const itemsStart = totalItems === 0 ? 0 : ((page - 1) * pageSize) + 1;
    const itemsEnd = Math.min(page * pageSize, totalItems);

    console.log('totalItems', totalItems);
    return (
      <Spinner loading={!!this.props.loading}>
        {
          widgetGroupingList.map(grouping => (
            <WidgetListTable
              key={grouping}
              title={grouping}
              widgetList={groupedWidgets[grouping]}
              columnOrder={columnOrder}
              onSetColumnOrder={onSetColumnOrder}
              locale={locale}
              onDelete={onDelete}
              onEdit={onEdit}
              onNewUserWidget={onNewUserWidget}
            />
          ))
        }
        <Col xs={12}>
          <PaginationRow
            itemCount={totalItems}
            itemsStart={itemsStart}
            itemsEnd={itemsEnd}
            viewType="table"
            pagination={pagination}
            amountOfPages={lastPage}
            pageInputValue={this.state.pageInputValue}
            onSubmit={this.handleFormSubmit}
            onPageInput={this.handlePageInput}
            onPerPageSelect={this.changePageSize}
            onFirstPage={() => this.changePage(1)}
            onPreviousPage={() => this.changePage(page - 1)}
            onNextPage={() => this.changePage(page + 1)}
            onLastPage={() => this.changePage(lastPage)}
          />
        </Col>
      </Spinner>
    );
  }

  render() {
    return (
      <InternalPage className="ListWidgetPage">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.uxComponents" />
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  <FormattedMessage id="menu.uxComponents.widget" />
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <PageTitle
                titleId="widget.list.title"
                helpId="widget.help"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              {this.renderTable()}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Button
                type="button"
                className="pull-right ListWidgetPage__add"
                bsStyle="primary"
                componentClass={Link}
                to={ROUTE_WIDGET_ADD}
              >
                <FormattedMessage id="app.add" />
              </Button>
            </Col>
          </Row>
          <DeleteWidgetModalContainer />
        </Grid>
      </InternalPage>
    );
  }
}

ListWidgetPage.propTypes = {
  onWillMount: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onNewUserWidget: PropTypes.func,
  locale: PropTypes.string,
  groupedWidgets: PropTypes.shape({}),
  widgetGroupingList: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
  totalItems: PropTypes.number,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  lastPage: PropTypes.number,
};

ListWidgetPage.defaultProps = {
  onWillMount: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onNewUserWidget: () => {},
  locale: 'en',
  groupedWidgets: {},
  widgetGroupingList: [],
  loading: false,
  onSetColumnOrder: () => {},
  columnOrder: [],
  totalItems: 0,
  page: 1,
  pageSize: 10,
  lastPage: 1,
};


export default ListWidgetPage;
