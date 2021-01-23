import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Container,
  Content,
  Form,
  Item,
  Button,
  Text,
  Input,
  Toast,
} from 'native-base';
import {API_URL, API_Token} from '../../constants/Constants';
import AppHeader from '../../shared/Header';
import Movie from '../../components/Movies/Movie';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigationFocus} from 'react-navigation';



class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      movies: [],
    };
  }

  validateSearch = () => {
    const {title} = this.state;

    if (title == '') {
      Toast.show({
        text: 'Title Is Required',
        type: 'danger',
        duration: 4000,
      });
      return;
    }

    this.search(title);
  };

  search = (title) => {
    fetch(API_URL + 'search/movie?api_key=' + API_Token + '&query=' + title, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.results && response.results.length > 0) {
          this.setState({movies: response.results});
        } else {
          this.setState({movies: []});
        }
      });
  };

  addToFavorites = async (ID) => {
    let sessionID = await AsyncStorage.getItem('sessionID');
    let formData = new FormData();
    formData.append('media_type', 'movie');
    formData.append('media_id', ID);
    formData.append('favorite', true);
    fetch(API_URL + 'account/{account_id}/favorite?api_key=' + API_Token + '&session_id=' + sessionID, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.success && response.success == true){
          Toast.show({
            text: 'Movie Added successfully',
            type: 'success',
            duration: 4000,
          });
        }else{
          Toast.show({
            text: 'Someting went wrong',
            type: 'danger',
            duration: 4000,
          });
        }
        
      });
  };

  navigateTODetailsScreen = (ID) => {
    this.props.navigation.navigate('Details',{ID:ID});
  }

  render() {
    const {movies} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: '#E9E9E9'}}>
        <ScrollView
          style={{flex: 1, paddingTop: this.state.headerHeight}}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}>
          <AppHeader
            showBack={false}
            background="#142954"
            IosBar="light-content"
            AndroidBar="transparent"
            textColor="#16D47B"
            Title={'Home'}
            moreStyles={{minWidth: '80%'}}
          />
          <Container
            style={{
              backgroundColor: '#F0F0F0',
              position: 'relative',
              height: '100%',
            }}>
            <Content style={styles.body}>
              <Form>
                <View>
                  <Item fixedLabel last style={styles.input}>
                    <Input
                      placeholderTextColor="#16D47B"
                      placeholder="Movie Title"
                      onChangeText={(title) => this.setState({title})}
                      autoCapitalize="none"
                    />
                  </Item>

                  <Button
                    style={styles.button}
                    onPress={() => this.validateSearch()}>
                    <Text
                      style={{
                        color: '#fff',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 18,
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                      }}>
                      Search
                    </Text>
                  </Button>
                </View>
              </Form>
            </Content>
            {movies &&
              movies.length > 0 &&
              movies.map((movie,index) => {
                return (
                  <Movie
                    key={index}
                    onPress={() => this.navigateTODetailsScreen(movie.id)}
                    ID={movie.id}
                    Image={movie.poster_path}
                    Title={movie.title}
                    ReleaseDate={movie.release_date}
                    Language={movie.original_language}
                    VoteAverage={movie.vote_average}
                    onPressButton={() => this.addToFavorites(movie.id)}
                    ButtonText={'Add To Favorites'}
                  />
                );
              })}
          </Container>
        </ScrollView>
      </View>
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

export default withNavigationFocus(HomeScreen);
