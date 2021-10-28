import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Col } from 'patternfly-react';
import cx from 'classnames';

import ComponentInstallActionsContainer from 'ui/component-repository/components/item/install-controls/ComponentInstallActionsContainer';
import ComponentImage from 'ui/component-repository/components/item/ComponentImage';
import DeploymentStatus from 'ui/component-repository/components/item/hub/DeploymentStatus';
import InstalledVersion from 'ui/component-repository/components/item/hub/InstalledVersion';
import { getECRComponentList } from 'state/component-repository/components/selectors';

const BundleListGridView =
({ bundles, openComponentManagementModal, bundleStatuses }) => {
  const components = useSelector(getECRComponentList);
  return (
    <div className="ComponentListGridView equal">
      {bundles.map((bundle, i) => {
          const bundleStatus = bundleStatuses.find(b => b.id === bundle.gitRepoAddress);
          const component = components.find(c => c.repoUrl === bundle.gitRepoAddress);
          return (
            <Col
              md={6}
              xs={6}
              key={`${bundle.gitRepoAddress}-${bundle.bundleId}`}
              className={cx('ComponentList__component', i % 2 === 0 && 'ComponentList__component--odd', 'no-padding')}
            >
              <div
                role="button"
                tabIndex={-1 * i}
                className="ComponentList__component-wrapper"
                onClick={() => openComponentManagementModal(bundle)}
                onKeyDown={() => openComponentManagementModal(bundle)}
              >

                <div className="ComponentList__component-image-wrapper">
                  <ComponentImage
                    component={{
                    ...bundle,
                    thumbnail: bundle.descriptionImage,
                    title: bundle.name,
                    }}
                  />
                </div>

                <div className="ComponentList__component-body">
                  <div className="ComponentList__component-content">
                    <p className="ComponentList__component-category">
                      <React.Fragment>
                        <FormattedMessage id="componentRepository.categories.bundle" />
                      </React.Fragment>
                    </p>
                    <h1>{bundle.name}</h1>
                    <p className="ComponentList__description">{bundle.description}</p>
                    <InstalledVersion
                      version={bundleStatus && bundleStatus.installedVersion}
                      installed
                    />
                    <DeploymentStatus bundleStatus={bundleStatus} />
                  </div>
                </div>
              </div>
              {
                component && (
                  <div className="ComponentList__component-footer" style={{ display: 'none' }}>
                    <ComponentInstallActionsContainer component={component} />
                  </div>
                )
              }
            </Col>
          );
        })}
    </div>
  );
};

BundleListGridView.propTypes = {
  bundles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    descriptionImage: PropTypes.string,
    description: PropTypes.string,
    gitRepoAddress: PropTypes.string,
    bundleId: PropTypes.string,
  })).isRequired,
  openComponentManagementModal: PropTypes.func,
  bundleStatuses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    installedVersion: PropTypes.string,
  })),
};

BundleListGridView.defaultProps = {
  openComponentManagementModal: () => {},
  bundleStatuses: [],
};

export default BundleListGridView;
