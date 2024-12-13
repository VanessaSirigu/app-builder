import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InternalPage from 'ui/internal-page/InternalPage';
import WidgetListTable from 'ui/widgets/list/WidgetListTable';
import PageTitle from 'ui/internal-page/PageTitle';
import HeaderBreadcrumb from 'ui/internal-page/HeaderBreadcrumb';
import { Grid, Row, Col, Button, Spinner } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ROUTE_WIDGET_ADD } from 'app-init/router';
import DeleteWidgetModalContainer from 'ui/widgets/list/DeleteWidgetModalContainer';

class ListWidgetPage extends Component {
  componentWillMount() {
    const { onWillMount, columnOrder, onSetColumnOrder } = this.props;
    if (!columnOrder.length) {
      onSetColumnOrder(['titles', 'code', 'used']);
    }
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
};


export default ListWidgetPage;
