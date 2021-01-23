import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Button,
  StyleProvider,
  Text,
  Toast,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Left,
  Right,
} from 'native-base';
import {API_URL, API_Token, BASE_URL} from '../../constants/Constants';
import AppHeader from '../../shared/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigationFocus} from 'react-navigation';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: {},
    };
  }

  componentDidMount() {
    this.getMovieDetails();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isFocused && this.props.isFocused) {
      this.getMovieDetails();
    }
  }

  getMovieDetails = () => {
    let movieID = this.props.navigation.getParam('ID');
    fetch(API_URL + 'movie/' + movieID + '?api_key=' + API_Token, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response) {
          this.setState({details: response});
        } else {
          this.setState({details: {}});
        }
      });
  };

  addToFavorites = async () => {
    let sessionID = await AsyncStorage.getItem('sessionID');
    let movieID = this.props.navigation.getParam('ID');
    let formData = new FormData();
    formData.append('media_type', 'movie');
    formData.append('media_id', movieID);
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

  render() {
    const {details} = this.state;
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
            Title={'Details'}
            moreStyles={{minWidth: '80%'}}
          />

          <Card style={{flex: 0}}>
            <CardItem cardBody>
              <Thumbnail
                style={styles.img}
                source={{uri: BASE_URL + details.poster_path}}
              />
            </CardItem>
            <CardItem>
              <Body>
                <Text style={styles.myTitle}>{'Title : ' + details.title}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text style={styles.myTitle}>{'Genres : '}</Text>
                {details.genres &&
                  details.genres.length > 0 &&
                  details.genres.map((genres, index) => {
                    return <Text key={index} style={styles.myTitle}>{genres.name + ' '}</Text>;
                  })}
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text style={styles.myTitle}>{'Language : ' + details.original_language}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text style={styles.myTitle}>{'Overview : ' + details.overview}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text style={styles.myTitle}>{'Release date : ' + details.release_date}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text style={styles.myTitle}>{'Vote average : ' + details.vote_average}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text style={styles.myTitle}>{'Vote count : ' + details.vote_count}</Text>
              </Body>
            </CardItem>

            <CardItem>
            <Body>
              <Button
              style={{marginBottom: 70,}}
                onPress={() => this.addToFavorites()}>
                <Text
                  style={{
                    color: '#fff',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 18,
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                  }}>
                  Add To Favorites
                </Text>
              </Button>
            </Body>
          </CardItem>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    borderRadius: 0,
    width: '100%',
    height: 200,
  },
  myTitle: {
    fontFamily: 'AvenirLTStd-Light',
    textTransform: 'capitalize',
    fontSize: 18,
  },
});
export default withNavigationFocus(DetailsScreen);
