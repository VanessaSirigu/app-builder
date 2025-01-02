import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import { LinkMenuItem } from '@entando/menu';
import { routeConverter } from '@entando/utils';

import {
  ROUTE_FRAGMENT_EDIT,
  ROUTE_FRAGMENT_CLONE,
  ROUTE_FRAGMENT_DETAIL,
} from 'app-init/router';
import Icon from 'ui/common/icon/Icon';

class FragmentListMenuActions extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(handler) {
    return (ev) => {
      ev.preventDefault();
      if (handler) { handler(this.props); }
    };
  }

  render() {
    const { onClickDelete } = this.props;
    const editLabel = (
      <FormattedMessage id="fragment.table.edit" values={{ code: this.props.code }} />
    );
    const cloneLabel = (
      <FormattedMessage id="fragment.table.clone" values={{ code: this.props.code }} />
    );
    const detailLabel = (
      <FormattedMessage id="fragment.table.details" values={{ code: this.props.code }} />
    );
    return (
      <DropdownKebab pullRight id={`${this.props.code}-actions`}>
        <div className="FragmentListMenuAction__menu-item-container">
          <Icon name="pencil" type="lucide" />
          <LinkMenuItem
            id={`edit-${this.props.code}`}
            to={routeConverter(ROUTE_FRAGMENT_EDIT, { fragmentCode: this.props.code })}
            label={editLabel}
            className="FragmentListMenuAction__menu-item-edit"
          />
        </div>
        <div className="FragmentListMenuAction__menu-item-container">
          <Icon name="pages" type="lucide" className="icon-flipped-x" />
          <LinkMenuItem
            id={`clone-${this.props.code}`}
            to={routeConverter(ROUTE_FRAGMENT_CLONE, { fragmentCode: this.props.code })}
            label={cloneLabel}
            className="FragmentListMenuAction__menu-item-clone"
          />
        </div>
        <div className="FragmentListMenuAction__menu-item-container">
          <Icon name="text" type="lucide" />
          <LinkMenuItem
            id={`edit-${this.props.code}`}
            to={routeConverter(ROUTE_FRAGMENT_DETAIL, { fragmentCode: this.props.code })}
            label={detailLabel}
            className="FragmentListMenuAction__menu-item-details"
          />
        </div>
        <div className="FragmentListMenuAction__menu-item-container">
          <Icon name="bin" type="lucide" color="#F64C4C" />
          <MenuItem
            className="FragmentListMenuAction__menu-item-delete danger"
            onClick={this.handleClick(onClickDelete)}
          >
            <FormattedMessage id="app.delete" />
          </MenuItem>
        </div>
      </DropdownKebab>
    );
  }
}

FragmentListMenuActions.propTypes = {
  onClickDelete: PropTypes.func,
  code: PropTypes.string.isRequired,
};

FragmentListMenuActions.defaultProps = {
  onClickDelete: () => {},
};

export default FragmentListMenuActions;
