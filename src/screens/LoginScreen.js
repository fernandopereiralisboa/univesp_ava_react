import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import {
  Button,
  FormInput,
} from 'react-native-elements';

import { authenticationLogIn } from '../actions';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  formInputContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  }
});

class Logo extends Component {
  render() {
    return (
      <Image
        source={require('../../res/images/UNIVESP-LOGO.png')}
        style={{ width: 300, height: 100 }}
      />
    );
  }
}

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };
  }

  onSignInButtonPressed = () => {
    this.props.authenticationLogIn(this.state.login, this.state.password);
  }

  render() {
    const { isAuthenticating } = this.props.authentication;

    if (isAuthenticating) {
      return <Loading />;
    }

    return(
      <View style={styles.container}>
        <Logo />
        <View style={styles.formInputContainer}>
          <FormInput
            containerStyle={{ flex: 1 }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="RA@aluno.univesp.br"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
          />
        </View>
        <View style={styles.formInputContainer}>
          <FormInput
            containerStyle={{ flex: 1 }}
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            backgroundColor="#3399ff"
            containerViewStyle={{ flex: 1 }}
            title="Sign In"
            onPress={this.onSignInButtonPressed}
          />
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  // State
  authentication: PropTypes.shape({
    isAuthenticating: PropTypes.bool.isRequired,
  }).isRequired,

  // Dispatch
  authenticationLogIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticationLogIn,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);