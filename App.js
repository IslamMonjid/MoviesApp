import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/Home/HomeScreen';
import LoginScreen from './screens/Login/LoginScreen';
import AuthLoadingScreen from './screens/Login/AuthLoadingScreen';
import DetailsScreen from './screens/Details/DetailsScreen';
import MyFavoritesScreen from './screens/MyFavorites/MyFavoritesScreen';
import Footer from './shared/Footer';
import {View} from 'react-native';
import {Root} from 'native-base';
import {Provider, Consumer} from './shared/context/AppContext';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    MyFavorites:MyFavoritesScreen
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'history',
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const navigation = React.createRef();

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack,
      AuthLoading: AuthLoadingScreen,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: 'Home',
      showFooter: false,
    };
  }

  handleNavigationChange = (prev, next, action) => {
    let noFooterPages = ['Auth', 'AuthLoading', 'Login'];

    let routes = next.routes[0].routes;
    let routeName = routes[routes.length - 1].routeName;
    this.setState({
      routeName: routeName == 'App' ? 'Home' : routeName,
      showFooter: noFooterPages.indexOf(routeName) == -1,
    });
    if (action) {
      if (noFooterPages.indexOf(action.routeName) !== -1) {
        this.setState({showFooter: false});
      }
    }
  };

  render() {
    const {routeName, showFooter} = this.state;
    return (
      <Root>
        <Provider>
          <View style={{flex: 1}}>
            <AppContainer
              ref={navigation}
              onNavigationStateChange={this.handleNavigationChange}
            />
            <Consumer>
              {state => {
                return (
                  // state.showFooter &&
                  showFooter && (
                    <Footer navigation={navigation} routeName={routeName} />
                  )
                );
              }}
            </Consumer>
          </View>
        </Provider>
      </Root>
    );
  }
}

export default App;
