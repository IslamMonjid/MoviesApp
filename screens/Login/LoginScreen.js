import React, {Component} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Container, Content, Form, Item, Button, Text, Input, Toast} from 'native-base';
import { API_URL, API_Token } from "../../constants/Constants";
import AsyncStorage from '@react-native-community/async-storage';

const dimensions = Dimensions.get('window');
const pageHeight = dimensions.height;


class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  async storeSessionID(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error.message);
    }
  }

  validateLogin = () =>{
    const {username, password} = this.state;

    if (username == '') {
      Toast.show({
        text: 'Username Is Required',
        type: 'danger',
        duration: 4000,
      });
      return;
    }

    if (password == '') {
      Toast.show({
        text: 'Password Is Required',
        type: 'danger',
        duration: 4000,
      });
      return;
    }

    this.login(username,password);
  }

  login = (username,password) => {

    fetch(API_URL + 'authentication/token/new?api_key=' + API_Token, {
      method: 'GET'
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        let token = response.request_token;
        
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('request_token', token);
        fetch(API_URL + 'authentication/token/validate_with_login?api_key=' + API_Token, {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            return response.json();
          })
          .then(response => {
            let formData = new FormData();
            formData.append('request_token', token);
            fetch(API_URL + 'authentication/session/new?api_key=' + API_Token, {
              method: 'POST',
              body: formData,
            })
              .then(response => {
                return response.json();
              })
              .then(response => {
                let sessionID = response.session_id;
                this.storeSessionID('sessionID', sessionID);
                this.props.navigation.navigate('App');
              });
          });
      });
  }



  render() {
    return (
      <Container
        style={{
          backgroundColor: '#F0F0F0',
          position: 'relative',
          height: pageHeight,
        }}>
        <Content style={styles.body}>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
              height: 75,
              marginBottom: pageHeight / 15,
              marginTop: 50,
            }}
            source={require('../../img/movie.jpg')}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              marginBottom: '20%',
              color: '#63c2a2',
              marginRight: 50,
              marginLeft: 50,
            }}>
            Enter your Username and Password to proceed
          </Text>
          <Form>
            <View>
              <Item fixedLabel last style={styles.input}>
                <Input
                  placeholderTextColor="#16D47B"
                  placeholder="Username"
                  onChangeText={(username) => this.setState({username})}
                  autoCapitalize="none"
                />
              </Item>

              <Item fixedLabel last style={styles.input}>
                <Input
                  placeholderTextColor="#16D47B"
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
                  autoCapitalize="none"
                />
              </Item>

              <Button style={styles.button} onPress={() => this.validateLogin()}>
                <Text
                  style={{
                    color: '#fff',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 18,
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                  }}>
                  Confirm
                </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    fontFamily: 'AvenirLTStd-Light',
    backgroundColor: '#fbfbfb',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  container: {},
  button: {
    backgroundColor: '#63c2a2',
    height: 60,
    width: '100%',
    marginBottom: 50,
    marginBottom: 0,
    borderRadius: 10,
    elevation: 0,
    marginTop: 15,
  },
  input: {
    borderBottomColor: '#63c2a2',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default LoginScreen;
