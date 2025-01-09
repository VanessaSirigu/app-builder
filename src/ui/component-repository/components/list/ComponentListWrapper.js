import React from 'react';
import { Row, Col, Button } from 'patternfly-react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getSelectedRegistry } from 'state/component-repository/hub/selectors';
import SidebarContainer from 'ui/component-repository/SidebarContainer';
import { ROUTE_ECR_CONFIG_LIST } from 'app-init/router';
import PageTitle from 'ui/internal-page/PageTitle';
import ComponentListContainer from 'ui/component-repository/components/list/ComponentListContainer';
import HubRegistrySwitcher from 'ui/component-repository/components/list/HubRegistrySwitcher';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import HubBundleList from 'ui/component-repository/components/list/HubBundleList';
import { getLoading } from 'state/loading/selectors';
import { fetchBundlesFromRegistryWithFilters, fetchBundleGroups, FETCH_BUNDLES_LOADING_STATE } from 'state/component-repository/hub/actions';
import { getPageSize } from 'state/pagination/selectors';

export const BUNDLE_GROUP_FILTER_ID = 'bundleGroup';

const ComponentListWrapper = () => {
  const dispatch = useDispatch();
  const activeRegistry = useSelector(getSelectedRegistry);
  const isLocalRegistry = activeRegistry.name === ECR_LOCAL_REGISTRY_NAME;
  const loading = useSelector(getLoading)[FETCH_BUNDLES_LOADING_STATE];
  const perPage = useSelector(getPageSize);
  const handleRefreshBundles = () => {
    dispatch(fetchBundlesFromRegistryWithFilters(
      activeRegistry.id,
      { page: 1, pageSize: perPage },
    ));
    dispatch(fetchBundleGroups(activeRegistry.id));
  };
  return (
    <React.Fragment>
      <div className="ComponentListPage__header">
        <PageTitle
          titleId="componentRepository.component.list.title"
          helpId="componentRepository.component.help"
          configLink={ROUTE_ECR_CONFIG_LIST}
          hideConfigLink
        />
      </div>
      <div className="ComponentListPage__body">

        <HubRegistrySwitcher />
        {
        !isLocalRegistry && (
          <Button
            key="bundleRefetchButton"
            type="button"
            bsStyle="primary"
            disabled={loading}
            className="ComponentListPage__refresh-button"
            onClick={handleRefreshBundles}
          >
            <FormattedMessage id="hub.bundle.refresh" />
            <i className="fa fa-refresh ComponentListPage__refresh-icon" />
          </Button>
        )
      }
        <Row />
        <Row>
          {/* {
          isLocalRegistry && (
            <Col md={3}>
              <SidebarContainer />
            </Col>
          )
        } */}
          <Col md={12}>
            {isLocalRegistry ? <ComponentListContainer /> : <HubBundleList />}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ComponentListWrapper;
