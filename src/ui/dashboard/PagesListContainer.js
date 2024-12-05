import { connect } from 'react-redux';
import { convertToQueryString } from '@entando/utils';

import PagesList from 'ui/dashboard/PagesList';
import { fetchDashboardPages } from 'state/pages/actions';
import { getDashboardPages } from 'state/pages/selectors';
import { setColumnOrder } from 'state/table-column-order/actions';
import { getColumnOrder } from 'state/table-column-order/selectors';
import { getCurrentPage, getTotalItems, getPageSize } from 'state/pagination/selectors';
import { getLocale } from 'state/locale/selectors';

import { withPermissionValues } from 'ui/auth/withPermissions';

const namespace = 'dashboardPages';

export const mapDispatchToProps = dispatch => ({
  onWillMount: () => {
    const queryString = convertToQueryString({
      sorting: {
        attribute: 'lastModified',
        direction: 'DESC',
      },
    });
    dispatch(fetchDashboardPages({ page: 1, pageSize: 500 }, queryString, namespace));
  },
  onSetColumnOrder: columnOrder => dispatch(setColumnOrder(columnOrder, 'dashboardPageList')),
});

export const mapStateToProps = state => (
  {
    pages: getDashboardPages(state),
    page: getCurrentPage(state, namespace),
    totalItems: getTotalItems(state, namespace),
    pageSize: getPageSize(state, namespace),
    language: getLocale(state),
    columnOrder: getColumnOrder(state, 'dashboardPageList'),
  }
);

export default withPermissionValues(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PagesList));
