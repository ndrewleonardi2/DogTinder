import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import data from '../data';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Swipe right to save; left to ignore',
  };
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          cards={data}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <View style={styles.group}>
                  <Image
                    style={styles.image}
                    source={{ uri: card.img }}
                  />
                </View>
                <View style={styles.group}>
                  <Text style={styles.title}>{`${card.name}, ${card.age} yr(s), ${card.sex}`}</Text>
                  <Text style={styles.description}>{card.profile}</Text>
                </View>
              </View>
            )
          }}
          onSwiped={(index) => { console.log(index) }}
          onSwipedAll={() => { console.log('onSwipedAll') }}
          cardIndex={0}
          backgroundColor={'#FFF'}
          stackSize={1}>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    flex: 1
  },
  group: {
    flex: 2
  },
  options: {
    flex: 3,
    flexDirection: 'row',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0
  },
  option: {
    flex: 3,
    width: '100%',
  },
  image: {
    flex: 2,
    width: undefined,
    height: undefined
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16
  }
});