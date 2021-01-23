import React, {Component} from 'react';
import {
  View,
  Header,
  Button,
  Title
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Platform,StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View>
        <Header
          noShadow
          noBorder
          transparent
          style={[styles.header, {backgroundColor: this.props.background}]}
          androidStatusBarColor={this.props.AndroidBar}
          iosBarStyle={this.props.IosBar}>
          <Grid
            style={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Row>
              {this.props.showBack && (
                <Col style={{width: '10%'}}>
                  <Button
                    transparent
                    onPress={() =>
                      this.props.navigation.goBack(null)
                    }>
                    <Icon
                  name="arrow-back"
                  style={{color: this.props.backColor, fontSize: 14}}
                />
                    <Ionicons
                      name="ios-arrow-round-back"
                      style={{
                        color: this.props.backColor,
                        // marginTop: 7,
                        // width: '100%',
                        // height: '100%',
                        fontSize: 25,
                      }}
                    />
                  </Button>
                </Col>
              )}
              <Col style={{width: '80%'}}>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.goBack(null)
                  }>
                  <Title
                    style={[
                      Platform.OS === 'ios'
                        ? styles.headerTextIos
                        : styles.headerTextAndroid,
                      {color: this.props.textColor},
                    ]}>
                    {this.props.Title}
                  </Title>
                </TouchableWithoutFeedback>
              </Col>
            </Row>
          </Grid>
        </Header>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  headerTextIos: {
    color: '#3D4144',
    fontSize: 15,
    height: 40,
    textAlignVertical: 'center',
    textAlign: 'left',
    marginTop: 10,
    fontWeight: '900',
    width: '100%',
  },
  headerTextAndroid: {
    color: '#3D4144',
    fontSize: 15,
    paddingLeft: 5,
    textAlign: 'left',
    marginTop: 10,
  },
});

export default withNavigation(AppHeader);
