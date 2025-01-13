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
import Icon from 'ui/common/icon/Icon';
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

  componentDidUpdate(prev) {
    const { widgetGroupingList: prevWidgetGroupingList } = prev;
    const { widgetGroupingList } = this.props;


    const areEqual =
      prevWidgetGroupingList.length === this.props.widgetGroupingList.length &&
      prevWidgetGroupingList.every((v, i) => v === this.props.widgetGroupingList[i]);

    // eslint-disable-next-line react/no-did-update-set-state
    if (!areEqual) this.setState({ filter: widgetGroupingList[0] });
  }

  renderContent(state) {
    const {
      groupedWidgets,
      onDelete,
      onEdit,
      onNewUserWidget,
      locale,
      columnOrder,
      onSetColumnOrder,
    } = this.props;
    const widgetList = groupedWidgets[state.filter] || [];
    return (
      <Spinner loading={!!this.props.loading}>
        {
          state.view === 'grid'
            ? <WidgetGridView
                key={state.filter}
                widgetList={widgetList}
                locale={locale}
                onDelete={onDelete}
                onEdit={onEdit}
                onNewUserWidget={onNewUserWidget}
            />
            : <WidgetListTable
                key={state.filter}
                widgetList={widgetList}
                columnOrder={columnOrder}
                onSetColumnOrder={onSetColumnOrder}
                locale={locale}
                onDelete={onDelete}
                onEdit={onEdit}
                onNewUserWidget={onNewUserWidget}
            />
        }
      </Spinner>
    );
  }

  render() {
    const { groupedWidgets, widgetGroupingList } = this.props;
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
          <Col xs={12} className="ListWidgetPage__button-group">
            <div className="ListWidgetPage__box">
              {
                widgetGroupingList.map(item => (
                  <Button
                    type="button"
                    className={`clear secondary pull-right ListWidgetPage__list ${(this.state.filter || widgetGroupingList[0]) === item ? 'ActiveButton' : ''}`}
                    onClick={() => this.setState({ filter: item })}
                    disabled={(this.state.filter || widgetGroupingList[0]) === item}
                  >
                    {/* <Icon name="-placeholder-" /> */}
                    {item}
                    <div className="CardItemCounter">
                      {groupedWidgets[item].length}
                    </div>
                  </Button>
                ))
              }
            </div>
            <div className="ListWidgetPage__box">
              <Button
                type="button"
                className="clear secondary pull-right ListWidgetPage__grid"
                onClick={() => this.setState({ view: 'grid' })}
                disabled={this.state.view === 'grid'}
              >
                <Icon name="table" />
                <FormattedMessage id="app.grid" />
              </Button>
              <Button
                type="button"
                className="clear secondary pull-right ListWidgetPage__list"
                onClick={() => this.setState({ view: 'list' })}
                disabled={this.state.view === 'list'}
              >
                <Icon name="list" />
                <FormattedMessage id="app.list" />
              </Button>
              <Button
                type="button"
                className="pull-right ListWidgetPage__add"
                componentClass={Link}
                to={ROUTE_WIDGET_ADD}
                bsStyle="primary"
              >
                <Icon name="plus" type="lucide" color="#F0F6FF" />
                <FormattedMessage id="app.add" />
              </Button>
            </div>
          </Col>
          <Row>
            <Col xs={12} >
              {this.renderContent(this.state)}
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
