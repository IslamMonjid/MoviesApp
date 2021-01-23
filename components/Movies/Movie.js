import React, {Component} from 'react';
import {Button, Text, Thumbnail, Card, CardItem, Body} from 'native-base';
import {TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {BASE_URL} from '../../constants/Constants';

class Movie extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onPress();
        }}>
        <Card style={{flex: 0}}>
          <CardItem cardBody>
            <Thumbnail
              style={styles.img}
              source={{uri: BASE_URL + this.props.Image}}
            />
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.myTitle}>
                {'Title : ' + this.props.Title}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.myTitle}>
                {'Release Date : ' + this.props.ReleaseDate}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.myTitle}>
                {'Language : ' + this.props.Language}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.myTitle}>
                {'Vote Average : ' + this.props.VoteAverage}
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Button
                onPress={() => this.props.onPressButton()}>
                <Text
                  style={{
                    color: '#fff',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: 18,
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                  }}>
                  {this.props.ButtonText}
                </Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
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
export default Movie;
