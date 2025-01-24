import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'patternfly-react';
import { required } from '@entando/utils';

import FormSectionTitle from 'ui/common/form/FormSectionTitle';
import SwitchRenderer from 'ui/common/form/SwitchRenderer';
import FormLabel from 'ui/common/form/FormLabel';
import RenderTextInput from 'ui/common/form/RenderTextInput';
import RenderRadioInput from 'ui/common/form/RenderRadioInput';

const msgs = defineMessages({
  formLabel: {
    id: 'menu.emailConfig',
    defaultMessage: 'Email Configuration',
  },
});

const EmailConfigSmtpServerBody = ({
  intl, handleSubmit, onTestConfig, onSendTestEmail, invalid, submitting,
}) => {
  const generalSettingsSection = (
    <Fragment>
      <FormSectionTitle titleId="emailConfig.smtpServer.generalSettings" />
      <Field
        component={SwitchRenderer}
        name="active"
        label={<FormLabel labelId="emailConfig.smtpServer.active" />}
      />
      <Field
        component={SwitchRenderer}
        name="debugMode"
        label={<FormLabel labelId="emailConfig.smtpServer.debugMode" />}
      />
    </Fragment>
  );

  const connectionSection = (
    <Fragment>
      <FormSectionTitle titleId="emailConfig.smtpServer.connection" />
      <Field
        component={RenderTextInput}
        name="host"
        label={<FormLabel labelId="emailConfig.smtpServer.host" required />}
        validate={required}
      />
      <Field
        component={RenderTextInput}
        name="port"
        label={<FormLabel labelId="emailConfig.smtpServer.port" />}
      />
      <Field
        component={RenderRadioInput}
        name="protocol"
        label={<FormLabel labelId="emailConfig.smtpServer.security" />}
        toggleElement={[
            { id: 'STD', label: <FormattedMessage id="app.enumerator.none" /> },
            { id: 'SSL', label: 'SSL' },
            { id: 'TLS', label: 'TLS' },
          ]}
      />
      <Field
        component={SwitchRenderer}
        name="checkServerIdentity"
        label={<FormLabel labelId="emailConfig.smtpServer.checkServerIdentity" />}
      />
      <Field
        component={RenderTextInput}
        name="timeout"
        label={<FormLabel labelId="emailConfig.smtpServer.timeout" />}
      />
    </Fragment>
  );

  const authenticationSection = (
    <Fragment>
      <FormSectionTitle titleId="emailConfig.smtpServer.authentication" />
      <Field
        component={RenderTextInput}
        name="username"
        label={<FormLabel labelId="emailConfig.smtpServer.username" />}
      />
      <Field
        component={RenderTextInput}
        name="password"
        label={<FormLabel labelId="emailConfig.smtpServer.password" />}
        type="password"
      />
    </Fragment>
  );

  const btnsDisabled = invalid || submitting;

  const buttonToolbar = (
    <div>
      <div className="btn-toolbar pull-right">
        <Button
          onClick={handleSubmit(onTestConfig)}
          bsStyle="success"
          disabled={btnsDisabled}
        >
          <FormattedMessage id="emailConfig.smtpServer.testConfig" />
        </Button>
        <Button
          onClick={onSendTestEmail}
          bsStyle="success"
          disabled={btnsDisabled}
        >
          <FormattedMessage id="emailConfig.smtpServer.sendTestEmail" />
        </Button>
        <Button
          type="submit"
          bsStyle="primary"
          disabled={btnsDisabled}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      aria-label={intl.formatMessage(msgs.formLabel)}
      onSubmit={handleSubmit}
      horizontal
      className="EmailConfigSmtpServer__form"
    >
      <Panel>
        <Panel.Body>
          <FormattedMessage id="emailConfig.smtpServer.panelMsg" />
        </Panel.Body>
      </Panel>
      {generalSettingsSection}
      {connectionSection}
      {authenticationSection}
      {buttonToolbar}
    </Form>
  );
};

EmailConfigSmtpServerBody.propTypes = {
  intl: intlShape.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onTestConfig: PropTypes.func.isRequired,
  onSendTestEmail: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const EmailConfigSmtpServer = injectIntl(reduxForm({
  form: 'emailConfig',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(EmailConfigSmtpServerBody));

export default EmailConfigSmtpServer;
