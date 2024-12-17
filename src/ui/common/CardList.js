import React from 'react';
import PropTypes from 'prop-types';
import { withPermissionValues } from 'ui/auth/withPermissions';
import CardItem from 'ui/common/CardItem';

const CardList = ({ list, actions }) => (
  <div className="CardList">
    {list.map(item => (
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
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    used: PropTypes.number.isRequired,
  })).isRequired,
  actions: PropTypes.oneOfType(['func', 'null']).isRequired,
};

export default withPermissionValues(CardList);
