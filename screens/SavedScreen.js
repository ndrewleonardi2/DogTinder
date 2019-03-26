import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import data from '../data.js';

export default class SavedScreen extends React.Component {
  static navigationOptions = {
    title: 'Saved',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {
          data.map((pet) => {
            return <View style={styles.card} key={pet.id}>
              <Image
                style={styles.image}
                source={{ uri: pet.img }}
              />
              <View style={styles.description}>
                <Text>{`Name: ${pet.name}, Age: ${pet.age}, Gender: ${pet.sex}`}</Text>
                <Text>{pet.profile}</Text>
              </View>

            </View>
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  card: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    flex: 2,
    flexDirection: 'row'
  },
  image: {
    flex: 3,
    justifyContent: 'center',
    margin: 5
  },
  description: {
    flex: 5
  },
});
