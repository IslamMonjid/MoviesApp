import React, {Component} from 'react';
import {Footer, FooterTab, Button, Text} from 'native-base';
import {StyleSheet, Image, Platform, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Col, Row, Grid} from 'react-native-easy-grid';

class FooterTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: ['item2'],
      footerVisible: true,
      footerCloseEvent: styles.footer,
      footerCloseEventBackground: '#fff',
      iconColor: '#63c2a2',
      iconPosition: 'center',
      homeHistory: 'Home',
      footerHeight: 55,
    };
  }

  navigate = (screen) => {
    this.props.navigation.current.dispatch(
      NavigationActions.navigate({routeName: screen}),
    );
  };
  openMenu = () => {
    let toggle = !this.state.footerHeight;
    this.setState({footerHeight: toggle});
  };
  render() {
    let routeName = '';
    if (this.props.routeName) {
      routeName = this.props.routeName;
    }
    return (
      <Footer  style={ styles.footerIos}>
        <FooterTab
          style={{
            flexDirection: 'row',
            height: 55,
            backgroundColor: '#16D47B',
            borderRadius: 15,
          }}>
          <Grid>
            <Row>
               <Col>
                <Button
                vertical
                badge
                active={routeName == 'Home'}
                onPress={() => {

                  this.navigate('Home');
                }}>
                
                <Text numberOfLines={1} style={styles.footerText}>
                Home
                </Text>
              </Button>
              </Col>
              <Col>
              <Button
                vertical
                badge
                active={routeName == 'MyFavorites'}
                onPress={() => {
                  this.navigate('MyFavorites');
                }}>
                
                <Text numberOfLines={1} style={styles.footerText}>
                My Favorites
                </Text>
              </Button>
              </Col>
            </Row>
          </Grid>

        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  activeBgStyle: {
    width: 35,
    height: 35,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeTextStyle: {
    fontSize: 15,
    color: 'red',
  },
  footerHomeText: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 10,
    paddingLeft: 5,
  },

  textStyle: {
    fontSize: 15,
    color: 'green',
  },
  container: {
    marginBottom: 4,
    marginTop: -5,
  },
  centerData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    alignSelf: 'flex-end',
    color: '#fff',
  },
  button: {
    padding: 50,
  },
  buttonText: {
    fontSize: 16,
  },
  footerText: {
    fontSize: 18,
    color: 'black'
  },
  footerActive: {
    width: '15%',
    borderTopLeftRadius: 70,
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
  footer: {
    backgroundColor: '#000',
  },
  footerBadge: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    left: '50%',
    top: 2,
    alignItems: 'center',
  },
  footerBadgeText: {
    fontSize: 10,
    width: 12,
    height: 12,
    lineHeight: 12,
    alignItems: 'center',
  },
  footerImg: {
    flex: 1,
    // width: 15,
    maxHeight: 20,
    alignSelf: 'center',
  },
  footerImg2: {
    flex: 1,
    width: 25,
    maxHeight: 25,
    alignSelf: 'center',
  },
  footerImg3: {
    width: 35,
    maxHeight: 35,
    alignSelf: 'center',
    marginTop: 15,
  },
  footerIos: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 70,
    width: '100%',
    // position: 'absolute',
    bottom: 0,
    left: '5%',
    borderTopColor: 'transparent',
    borderTopWidth: 0,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    backgroundColor: 'transparent',
  },
});

export default FooterTabs;
