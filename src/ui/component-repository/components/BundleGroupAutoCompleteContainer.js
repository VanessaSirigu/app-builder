import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { fetchBundlesFromRegistryWithFilters } from 'state/component-repository/hub/actions';
import { BUNDLE_GROUP_FILTER_ID } from 'ui/component-repository/components/list/ComponentListActionsWrapper';
import BundleGroupAutoComplete, { FORM_NAME } from 'ui/component-repository/components/BundleGroupAutoComplete';

export const mapStateToProps = state => ({
  searchTerm: formValueSelector(FORM_NAME)(state, BUNDLE_GROUP_FILTER_ID),
});

export const mapDispatchToProps = dispatch => ({
  onSubmit: (_, registryId, page) => dispatch(fetchBundlesFromRegistryWithFilters(
    registryId,
    { page: 1, pageSize: page.pageSize },
  )),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false,
})(BundleGroupAutoComplete);
