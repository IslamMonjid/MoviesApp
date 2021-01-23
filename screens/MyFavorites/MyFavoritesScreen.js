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

class MyFavoritesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myFavorites: [],
    };
  }

  componentDidMount() {
    this.getFavoritesMovies();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isFocused && this.props.isFocused) {
      this.getFavoritesMovies();
    }
  }

  getFavoritesMovies = async () => {
    let sessionID = await AsyncStorage.getItem('sessionID');
    fetch(
      API_URL +
        'account/{account_id}/favorite/movies?api_key=' +
        API_Token +
        '&session_id=' +
        sessionID +
        '&language=en-US&sort_by=created_at.asc&page=1',
      {
        method: 'GET',
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.results && response.results.length > 0) {
          this.setState({myFavorites: response.results});
        } else {
          this.setState({myFavorites: []});
        }
      });
  };

  navigateTODetailsScreen = (ID) => {
    this.props.navigation.navigate('Details',{ID:ID});
  }

  removeFromFavorites = async (ID) => {
    let sessionID = await AsyncStorage.getItem('sessionID');
    let formData = new FormData();
    formData.append('media_type', 'movie');
    formData.append('media_id', ID);
    formData.append('favorite', false);
    fetch(API_URL + 'account/{account_id}/favorite?api_key=' + API_Token + '&session_id=' + sessionID, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.success && response.success == true){
          this.getFavoritesMovies();
          Toast.show({
            text: 'Movie Removed successfully',
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
  }

  render() {
    const {myFavorites} = this.state;
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
            Title={'My Favorites'}
            moreStyles={{minWidth: '80%'}}
          />

          {myFavorites &&
            myFavorites.length > 0 &&
            myFavorites.map((movie, index) => {
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
                  onPressButton={() => this.removeFromFavorites(movie.id)}
                  ButtonText={'Remove Favorites'}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  }
}

export default withNavigationFocus(MyFavoritesScreen);
