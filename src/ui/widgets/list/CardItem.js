import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { withPermissionValues } from 'ui/auth/withPermissions';
import WidgetIcon from 'ui/widgets/common/WidgetIcon';
import { ROUTE_WIDGET_EDIT } from 'app-init/router';
import { routeConverter } from '@entando/utils';
import { Link } from 'react-router-dom';

const CardItem = ({
  title,
  code,
  used,
  actions,
}) => (
  <div className="CardItem">
    {actions && <div className="CardItemActions">{actions}</div>}
    <div className="CardItemIconWrapper">
      <WidgetIcon widgetId={code} />
    </div>
    <div>
      <div className="CardItemLabel">
        <Link className="CardItemLink" to={routeConverter(ROUTE_WIDGET_EDIT, { widgetCode: code })}>
          {title}
        </Link>
        <OverlayTrigger
          placement="top"
          trigger={['click']}
          rootClose
          overlay={
            <Popover>
              <FormattedMessage id="app.used" />
            </Popover>
          }
        >
          <div className="CardItemCounter">{used}</div>
        </OverlayTrigger>
      </div>
      <div className="CardItemCode">{code}</div>
    </div>
  </div>
);

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  used: PropTypes.number.isRequired,
  actions: PropTypes.oneOfType(['func', 'null']).isRequired,
};

export default withPermissionValues(CardItem);
