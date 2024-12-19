import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'patternfly-react';
import { FormattedMessage } from 'react-intl';
import { withPermissionValues } from 'ui/auth/withPermissions';
import WidgetIcon from 'ui/widgets/common/WidgetIcon';
import { routeConverter } from '@entando/utils';
import { Link } from 'react-router-dom';

const CardItem = ({
  title,
  code,
  subtitle,
  used,
  actions,
  route,
}) => (
  <div className="CardItem">
    {actions && <div className="CardItemActions">{actions}</div>}
    <div className="CardItemIconWrapper">
      <WidgetIcon widgetId={code} /> {/* TODO - generic icon */}
    </div>
    <div>
      <div className="CardItemLabel">
        {route ?
          <Link className="CardItemLink" to={routeConverter(route.url, { [route.type]: code })}>
            {title}
          </Link> :
          <React.Fragment>
            {title}
          </React.Fragment>
        }
        {used &&
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
        }
      </div>
      <div className="CardItemSubtitle">{subtitle}</div>
    </div>
  </div>
);

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  subtitle: PropTypes.oneOfType(['string', 'null']).isRequired,
  used: PropTypes.oneOfType(['number', 'null']).isRequired,
  route: PropTypes.oneOfType([
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }), 'null']).isRequired,
  actions: PropTypes.oneOfType(['func', 'null']).isRequired,
};

export default withPermissionValues(CardItem);
