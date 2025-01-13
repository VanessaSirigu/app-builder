import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getSelectedRegistry } from 'state/component-repository/hub/selectors';

import SearchBarContainer from 'ui/component-repository/components/SearchBarContainer';
import FilterTypeContainer from 'ui/component-repository/components/FilterTypeContainer';
import ComponentListViewModeSwitcherContainer from 'ui/component-repository/components/list/ComponentListViewModeSwitcherContainer';
import ExtraTabBarFilterContainer from 'ui/component-repository/ExtraTabBarFilterContainer';
import { ECR_LOCAL_REGISTRY_NAME } from 'state/component-repository/hub/reducer';
import BundleGroupAutoCompleteContainer from 'ui/component-repository/components/BundleGroupAutoCompleteContainer';
import { getLoading } from 'state/loading/selectors';
import { fetchBundlesFromRegistryWithFilters, fetchBundleGroups, FETCH_BUNDLES_LOADING_STATE } from 'state/component-repository/hub/actions';
import { getPageSize } from 'state/pagination/selectors';
import Button from 'ui/common/Button';

export const BUNDLE_GROUP_FILTER_ID = 'bundleGroup';

const ComponentListActionsWrapper = () => {
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
    <div className="ComponentListActionsWrapper">
      {/* {
              isLocalRegistry && (
                <Col md={3}>
                  <SidebarContainer />
                </Col>
              )
      } */}
      <div className="ComponentListPage__container">
        <div className="ComponentListPage__container-header">
          <div className="ComponentListPage__container-header-title">
            {/* <FormattedMessage id="componentRepository.categories.component" /> */}
          </div>
          <div className="ComponentListPage__container-header-actionbar">
            <div>
              {
                isLocalRegistry ? <FilterTypeContainer /> : (
                  <Button
                    key={BUNDLE_GROUP_FILTER_ID}
                    className="active"
                  >
                    <FormattedMessage id="app.filterTypesSelect.bundleGroup" />
                  </Button>
                )
              }
              {isLocalRegistry ? <SearchBarContainer /> : <BundleGroupAutoCompleteContainer />}
            </div>
            <div>
              { isLocalRegistry && <ExtraTabBarFilterContainer /> }
            </div>
            <div>
              <ComponentListViewModeSwitcherContainer />
            </div>
            { !isLocalRegistry && (
            <Button // TO DO - style button
              key="bundleRefetchButton"
              // bsStyle="primary"
              disabled={loading}
              className="ComponentListPage__refresh-button primary"
              onClick={handleRefreshBundles}
            >
              <FormattedMessage id="hub.bundle.refresh" />
              <i className="fa fa-refresh ComponentListPage__refresh-icon" />
            </Button>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentListActionsWrapper;
