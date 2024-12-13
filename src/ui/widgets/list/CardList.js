import React from 'react';
import PropTypes from 'prop-types';
import { withPermissionValues } from 'ui/auth/withPermissions';
import CardItem from './CardItem';

const CardList = ({ widgetList, actions }) => (
  <div className="CardList">
    {widgetList.map(item => (
      <CardItem
        title={item.title}
        code={item.code}
        used={item.used}
        actions={actions(item)}
      />
    ))}
  </div>
);

CardList.propTypes = {
  widgetList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    used: PropTypes.number.isRequired,
  })).isRequired,
  actions: PropTypes.oneOfType(['func', 'null']).isRequired,
};

export default withPermissionValues(CardList);
