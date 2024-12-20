import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Alert, Spinner } from 'patternfly-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import GroupListMenuActions from 'ui/groups/list/GroupListMenuActions';
import DeleteGroupModalContainer from 'ui/groups/common/DeleteGroupModalContainer';
import UserTable from 'ui/users/common/UserTable';

class GroupListTable extends Component {
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

  renderTableRows() {
    return this.props.groups.map(group => (
      <tr key={group.code}>
        <td className="GroupListRow__td">{group.name}</td>
        <td className="GroupListRow__td">{group.code}</td>
        <td
          className="GroupListRow__td text-center"
          data-testid={`${group.code}-actions`}
        >
          <GroupListMenuActions
            code={group.code}
            onClickDelete={this.props.onClickDelete}
          />
        </td>
      </tr>
    ));
  }

  renderTable() {
    const {
      groups, page, pageSize, intl,
    } = this.props;
    if (groups.length > 0) {
      const pagination = { page, perPage: pageSize, perPageOptions: [5, 10, 15, 25, 50] };

      const columns = [
        { title: 'app.name', field: 'name', className: 'GroupListTable__th-lg' },
        { title: 'app.code', field: 'code', className: 'GroupListTable__th-lg' },
        {
          title: '',
          field: 'actions',
          className: 'GroupListTable__th-xs text-center',
          render: props => (
            <div>
              <GroupListMenuActions
                code={props.code}
                onClickDelete={this.props.onClickDelete}
              />
            </div>
          ),
        },
      ];


      return (
        <UserTable
          intl={intl}
          columns={columns}
          rows={groups}
          pagination={pagination}
          totalItems={this.props.totalItems}
          onChangePage={this.changePage}
          onChangePageSize={this.changePageSize}
        />
      );
    }
    return (
      <Col xs={12}>
        <Alert type="warning">
          <strong><FormattedMessage id="group.listEmpty" /></strong>
        </Alert>
      </Col>
    );
  }

  render() {
    return (
      <div className="GroupListTable">
        <Spinner loading={!!this.props.loading}>
          {this.renderTable()}
          <DeleteGroupModalContainer />
        </Spinner>
      </div>
    );
  }
}

GroupListTable.propTypes = {
  intl: intlShape.isRequired,
  onWillMount: PropTypes.func,
  loading: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })),
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onClickDelete: PropTypes.func,
};

GroupListTable.defaultProps = {
  onWillMount: () => { },
  loading: false,
  groups: [],
  onClickDelete: () => { },
};

export default injectIntl(GroupListTable);
