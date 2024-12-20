import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Col, Spinner, Pager } from 'patternfly-react';

import { renderFragmentListMenuActions } from 'ui/fragments/list/FragmentListMenuActions';
import DeleteFragmentModalContainer from 'ui/fragments/list/DeleteFragmentModalContainer';
import paginatorMessages from 'ui/paginatorMessages';
import CardList from 'ui/common/CardList';

class FragmentGrid extends Component {
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
    const { onWillMount } = this.props;
    onWillMount();
  }


  changePage(page) {
    const { filters } = this.props;
    this.props.onWillMount({ page, pageSize: this.props.pageSize }, filters);

    this.setState({ pageInputValue: page });
  }

  changePageSize(pageSize) {
    const { filters } = this.props;
    this.props.onWillMount({ page: 1, pageSize }, filters);
  }

  handleFormSubmit() {
    this.changePage(this.state.pageInputValue);
  }

  handlePageInput(e) {
    this.setState({ pageInputValue: e.target.value });
  }

  renderContent() {
    const {
      page,
      pageSize,
      intl,
      fragments,
      totalItems,
      lastPage,
    } = this.props;
    const pagination = {
      page,
      perPage: pageSize,
      perPageOptions: [5, 10, 15, 25, 50, 100, 150],
    };

    const newFragments = fragments.map(f => (
      {
        title: f.code,
        subtitle: Object.is(f.widgetType, null) ? '' : f.widgetType.title,
        ...f,
      }));

    const messages = Object.keys(paginatorMessages).reduce((acc, curr) => (
      { ...acc, [curr]: intl.formatMessage(paginatorMessages[curr]) }
    ), {});

    const itemsStart = totalItems === 0 ? 0 : ((page - 1) * pageSize) + 1;
    const itemsEnd = Math.min(page * pageSize, totalItems);

    return (
      <Col xs={12}>
        <CardList list={newFragments} actions={renderFragmentListMenuActions} />
        <Pager
          showPageSizeOptions={false}
          perPageComponent="button"
          itemCount={totalItems}
          itemsStart={itemsStart}
          itemsEnd={itemsEnd}
          viewType="table"
          pagination={pagination}
          amountOfPages={lastPage}
          pageInputValue={this.state.pageInputValue}
          onSubmit={this.handleFormSubmit}
          onPageInput={this.handlePageInput}
          onFirstPage={() => this.changePage(1)}
          onPreviousPage={() => this.changePage(page - 1)}
          onNextPage={() => this.changePage(page + 1)}
          onLastPage={() => this.changePage(lastPage)}
          messages={messages}
        />
      </Col>);
  }

  render() {
    return (
      <div className="FragmentGrid">
        <Spinner loading={!!this.props.loading} >
          {this.renderContent()}
        </Spinner>
        <DeleteFragmentModalContainer />
      </div>
    );
  }
}

FragmentGrid.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  fragments: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    isLocked: PropTypes.bool,
    widgetType: PropTypes.shape({
      code: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    pluginCode: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  filters: PropTypes.string,
};

FragmentGrid.defaultProps = {
  onWillMount: () => { },
  loading: false,
  fragments: [],
  filters: '',
};

export default injectIntl(FragmentGrid);
