import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button, Spinner } from 'patternfly-react';
import { reduxForm, FieldArray } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { ACTION_SAVE, ACTION_UPDATE } from 'state/users/const';
import UserAuthorityTable from 'ui/users/authority/UserAuthorityTable';
import { TEST_ID_USER_AUTHORITY_PAGE_FORM } from 'ui/test-const/user-test-const';

export class UserAuthorityPageFormBody extends Component {
  constructor(props) {
    super(props);
    this.group = null;
    this.role = null;
  }

  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      invalid, submitting, handleSubmit, onAddNewClicked, onCloseModal,
    } = this.props;

    return (
      <Spinner loading={!!this.props.loading}>
        <form
          onSubmit={handleSubmit(values => this.props.onSubmit(values, this.props.actionOnSave))}
          className="UserAuthorityPageForm form-horizontal"
        >
          <Col xs={12}>
            <Grid fluid>
              <Row>
                <Col xs={12}>
                  <FieldArray
                    name="groupRolesCombo"
                    component={UserAuthorityTable}
                    groups={this.props.groups}
                    roles={this.props.roles}
                    groupRolesCombo={this.props.groupRolesCombo}
                    onAddNewClicked={onAddNewClicked}
                    onCloseModal={onCloseModal}
                  />
                </Col>
              </Row>
            </Grid>
            <Col xs={12}>
              <Button
                type="submit"
                bsStyle="primary"
                className="pull-right"
                disabled={invalid || submitting}
                data-testid={TEST_ID_USER_AUTHORITY_PAGE_FORM.SAVE_BUTTON}
              >
                <FormattedMessage id="app.save" />
              </Button>
            </Col>
          </Col>
        </form>
      </Spinner>
    );
  }
}

UserAuthorityPageFormBody.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onWillMount: PropTypes.func.isRequired,
  onAddNewClicked: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  actionOnSave: PropTypes.oneOf([ACTION_SAVE, ACTION_UPDATE]),
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  roles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  })),
  groupRolesCombo: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.shape({ code: PropTypes.string, name: PropTypes.string }),
    role: PropTypes.shape({ code: PropTypes.string, name: PropTypes.string }),
  })),
  loading: PropTypes.bool,

};

UserAuthorityPageFormBody.defaultProps = {
  invalid: false,
  submitting: false,
  groups: [],
  roles: [],
  groupRolesCombo: [],
  actionOnSave: ACTION_SAVE,
  loading: false,
};

const UserAuthorityPageForm = reduxForm({
  form: 'autorityForm',
})(UserAuthorityPageFormBody);

export default UserAuthorityPageForm;
