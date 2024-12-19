import React from 'react';
import PropTypes from 'prop-types';
import { withPermissionValues } from 'ui/auth/withPermissions';
import CardItem from 'ui/common/CardItem';

const CardList = ({ list, actions, route }) =>
  (
    <div className="CardList">
      {list.map(item => (
        <CardItem
          title={item.title}
          code={item.code}
          subtitle={item.subtitle}
          used={item.used}
          route={route}
          actions={actions(item)}
        />
    ))}
    </div>
  );
CardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    subtitle: PropTypes.oneOfType(['string', 'null']).isRequired,
    used: PropTypes.oneOfType(['number', 'null']).isRequired,
  })).isRequired,
  actions: PropTypes.oneOfType(['func', 'null']).isRequired,
  route: PropTypes.oneOfType([
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }), 'null']).isRequired,
};

export default withPermissionValues(CardList);
