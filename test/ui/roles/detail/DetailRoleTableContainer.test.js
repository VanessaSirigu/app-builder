import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/roles/detail/DetailRoleTableContainer';
import { getLoading } from 'state/loading/selectors';

jest.mock('state/roles/actions', () => ({
  fetchRoleDetail: jest.fn().mockReturnValue('fetchRoleDetail_result'),
}));

jest.mock('state/permissions/actions', () => ({
  fetchPermissions: jest.fn().mockReturnValue('fetchPermissions_result'),
}));

jest.mock('state/loading/selectors', () => ({
  getLoading: jest.fn(),
}));

getLoading.mockReturnValue(false);

jest.mock('state/roles/selectors', () => ({
  getSelectedRole: jest.fn().mockReturnValue('getSelectedRole_result'),
  getSelectedRolePermissionsList: jest.fn().mockReturnValue('getSelectedRolePermissionsList_result'),
}));

const ownProps = {
  match: {
    params: {
      roleCode: 'role_code',
    },
  },
};

describe('DetailRoleTableContainer', () => {
  const dispatchMock = jest.fn();

  describe('mapStateToProps', () => {
    let props;
    beforeEach(() => {
      props = mapStateToProps({}, ownProps);
    });

    it('maps the properties', () => {
      expect(props).toHaveProperty('role', 'getSelectedRole_result');
      expect(props).toHaveProperty('roleCode', 'role_code');
      expect(props).toHaveProperty('rolePermissions', 'getSelectedRolePermissionsList_result');
    });
  });

  describe('mapDispatchToProps', () => {
    let props;
    beforeEach(() => {
      props = mapDispatchToProps(dispatchMock);
    });

    it('maps the "onWillMount" prop a fetchPermissions dispatch', () => {
      expect(props.onWillMount).toBeDefined();
      props.onWillMount('role_code');
      expect(dispatchMock).toHaveBeenCalledWith('fetchRoleDetail_result');
    });
  });
});
