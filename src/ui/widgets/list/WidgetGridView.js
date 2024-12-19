import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, DropdownKebab, MenuItem } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import WidgetSectionTitle from 'ui/widgets/list/WidgetSectionTitle';
import { withPermissionValues } from 'ui/auth/withPermissions';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';
import CardList from 'ui/common/CardList';

export const WidgetGrid = ({
  title,
  widgetList,
  locale,
  onDelete,
  onEdit,
  onNewUserWidget,
  isSuperuser,
}) => {
  const Actions = item => (
    <div data-testid={`${item.code}-actions`}>
      <DropdownKebab pullRight id={`WidgetListRow-dropdown-${item.code}`}>
        {item.hasConfig && (
        <MenuItem
          className="WidgetListRow__menu-item-addwidget"
          onClick={() => onNewUserWidget(item.code)}
        >
          <FormattedMessage id="widgets.addWidget" />
        </MenuItem>)}
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
        </MenuItem>)}
      </DropdownKebab>
    </div>
  );

  const newWidgetList = useMemo(() =>
    widgetList.map(item => (
      { ...item, title: item.titles[locale], subtitle: item.code })), [locale, widgetList]);
  const route = useMemo(() => ({ url: ROUTE_WIDGET_EDIT, type: 'widgetCode' }), []);

  return (
    <div className="WidgetListTable">
      <Col xs={12} className="WidgetListTable__tables">
        <WidgetSectionTitle
          title={<FormattedMessage id={`widget.list.section.${title}`} defaultMessage={title} />}
        />
        <CardList
          list={newWidgetList}
          actions={isSuperuser ? Actions : null}
          route={route}
        />

      </Col>
    </div>
  );
};

WidgetGrid.propTypes = {
  title: PropTypes.string.isRequired,
  widgetList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  locale: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onNewUserWidget: PropTypes.func.isRequired,
  isSuperuser: PropTypes.bool,
};

WidgetGrid.defaultProps = {
  isSuperuser: true,
};

export default withPermissionValues(WidgetGrid);
