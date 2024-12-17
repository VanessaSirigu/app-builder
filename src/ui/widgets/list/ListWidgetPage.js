import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import { Grid, Row, Col, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ROUTE_WIDGET_ADD } from 'app-init/router';
import DeleteWidgetModalContainer from 'ui/widgets/list/DeleteWidgetModalContainer';
import Icon from 'ui/common/Icon';
import Button from 'ui/common/Button';
import WidgetGridView from './WidgetGridView';

class ListWidgetPage extends Component {
  componentWillMount() {
    const { onWillMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['titles', 'code', 'used']);
    }
    this.setState({ view: 'grid' });
    onWillMount(this.props);
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
    } = this.props;
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
      </Spinner>
    );
  }

  renderGrid() {
    const {
      groupedWidgets,
      widgetGroupingList,
      onDelete,
      onEdit,
      onNewUserWidget,
      locale,
      columnOrder,
      onSetColumnOrder,
    } = this.props;
    return (
      <Spinner loading={!!this.props.loading}>
        {
          widgetGroupingList.map(grouping => (
            <WidgetGridView
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
      </Spinner>
    );
  }

  render() {
    return (
      <InternalPage className="ListWidgetPage">
        <HeaderBreadcrumb breadcrumbs={[
          { label: 'menu.uxComponents', active: true },
          { label: 'menu.uxComponents.widget', active: true },
        ]}
        />
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <PageTitle
                titleId="widget.list.title"
                helpId="widget.help"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="ListWidgetPage__button-group">
              <Button
                type="button"
                className="clear secondary pull-right ListWidgetPage__grid"
                onClick={() => this.setState({ view: 'grid' })}
                disabled={this.state.view === 'grid'}
              >
                <Icon name="table" />
                Grid
              </Button>
              <Button
                type="button"
                className="clear secondary pull-right ListWidgetPage__list"
                onClick={() => this.setState({ view: 'list' })}
                disabled={this.state.view === 'list'}
              >
                <Icon name="list" />
                List
              </Button>
              <Button
                type="button"
                className="pull-right ListWidgetPage__add"
                componentClass={Link}
                to={ROUTE_WIDGET_ADD}
                bsStyle="primary"
              >
                <Icon name="plus" />
                <FormattedMessage id="app.add" />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} >
              {this.state.view === 'grid' ? this.renderGrid() : this.renderTable()}
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
};

ListWidgetPage.defaultProps = {
  onWillMount: () => { },
  onDelete: () => { },
  onEdit: () => { },
  onNewUserWidget: () => { },
  locale: 'en',
  groupedWidgets: {},
  widgetGroupingList: [],
  loading: false,
  onSetColumnOrder: () => { },
  columnOrder: [],
};


export default ListWidgetPage;
