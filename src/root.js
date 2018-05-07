import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import createRootNavigator from './routes';

const Root = ({ authentication }) => {
  const { isAuthenticated } = authentication;
  const RootNavigator = createRootNavigator(isAuthenticated);

  return <RootNavigator />;
};

Root.propTypes = {
  authentication: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(Root);