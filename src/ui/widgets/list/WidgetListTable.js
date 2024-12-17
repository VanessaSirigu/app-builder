import React from 'react';
import PropTypes from 'prop-types';
import { Col, DropdownKebab, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { DataTable } from '@entando/datatable';
import { routeConverter } from '@entando/utils';
import { Link } from 'react-router-dom';
import WidgetSectionTitle from 'ui/widgets/list/WidgetSectionTitle';
import WidgetIcon from 'ui/widgets/common/WidgetIcon';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';
import { withPermissionValues } from 'ui/auth/withPermissions';

export const WidgetListTableBody = ({
  title,
  widgetList,
  locale,
  columnOrder,
  onDelete,
  onEdit,
  onSetColumnOrder,
  onNewUserWidget,
  isSuperuser,
}) => {
  const nameCell = (cellinfo) => {
    const { row: { original: item } } = cellinfo;
    return (
      <div className="titles">
        <WidgetIcon widgetId={item.code} small />
        &nbsp;&nbsp;
        <Link
          className="WidgetListRow__link"
          to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: item.code })}
        >
          {item.titles[locale]}
        </Link>
      </div>
    );
  };

  const columnDefs = {
    titles: {
      Header: <FormattedMessage id="app.name" />,
      attributes: { style: { width: '40%' } },
      Cell: nameCell,
    },
    code: {
      Header: <FormattedMessage id="app.code" />,
      attributes: { style: { width: '40%' } },
    },
    used: {
      Header: <FormattedMessage id="app.used" />,
      attributes: { className: 'text-center', style: { width: '10%' } },
      cellAttributes: { className: 'text-center' },
    },
  };

  const Actions = item => (
    <div data-testid={`${item.code}-actions`}>
      <DropdownKebab pullRight id={`WidgetListRow-dropdown-${item.code}`}>
        {item.hasConfig && (
          <MenuItem
            className="WidgetListRow__menu-item-addwidget"
            onClick={() => onNewUserWidget(item.code)}
          >
            <FormattedMessage id="widgets.addWidget" />
          </MenuItem>
        )}
        <MenuItem
          className="WidgetListRow__menu-item-edit"
          onClick={() => onEdit(item.code)}
        >
          <FormattedMessage id="app.edit" />
        </MenuItem>
        {!item.locked && item.used === 0 && (
          <MenuItem
            className="WidgetListRow__menu-item-delete"
            onClick={() => onDelete(item.code)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        )}
      </DropdownKebab>
    </div>
  );

  const columns = columnOrder.map(column => ({ ...columnDefs[column], accessor: column }));

  const rowAction = isSuperuser ? ({
    Header: <FormattedMessage id="app.actions" />,
    attributes: { className: 'text-center', style: { width: '10%' } },
    cellAttributes: { className: 'text-center' },
    Cell: cellinfo => Actions(cellinfo),
  }) : null;

  return (
    <div className="WidgetListTable">
      <Col xs={12} className="WidgetListTable__tables">
        <WidgetSectionTitle
          title={<FormattedMessage id={`widget.list.section.${title}`} defaultMessage={title} />}
        />
        <DataTable
          columns={columns}
          data={widgetList}
          rowAction={rowAction}
          columnResizable
          onColumnReorder={onSetColumnOrder}
          classNames={{
            table: 'WidgetListTable table-hover table-treegrid table-bordered',
            headerGroup: 'table-header',
            row: 'table-row',
            cell: 'table-cell',
          }}
        />
      </Col>
    </div>
  );
};

WidgetListTableBody.propTypes = {
  title: PropTypes.string.isRequired,
  widgetList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  locale: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onNewUserWidget: PropTypes.func.isRequired,
  isSuperuser: PropTypes.bool,
  columnOrder: PropTypes.arrayOf(PropTypes.string),
  onSetColumnOrder: PropTypes.func,
};

WidgetListTableBody.defaultProps = {
  isSuperuser: true,
  onSetColumnOrder: () => { },
  columnOrder: [],
};

export default withPermissionValues(WidgetListTableBody);
