import { DrawerNavigator, StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import ControlPanelScreen from './screens/ControlPanelScreen';

const LoggedOutRoutes = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Sign In'
    }
  }
});

const LoggedInRoutes = DrawerNavigator({
  ControlPanel: {
    screen: ControlPanelScreen,
    navigationOptions: {
      title: 'Control Panel'
    }
  }
});

const createRootNavigator = (loggedIn = false) => StackNavigator({
  LoggedIn: {
    screen: LoggedInRoutes
  },
  LoggedOut: {
    screen: LoggedOutRoutes
  }
}, {
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: loggedIn ? 'LoggedIn' : 'LoggedOut',
  navigationOptions: {
    gesturesEnabled: false
  }
});

export default createRootNavigator;