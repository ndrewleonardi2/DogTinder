import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ACTION_CREATORS from '../redux/action_creators';
import { connect } from 'react-redux';

class SavedScreen extends Component {
  static navigationOptions = {
    title: 'Saved',
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.props.saved.map((pet) => {
            return <View style={styles.card} key={pet.id}>
              <Image
                style={styles.image}
                source={{ uri: pet.img }}
              />
              <View style={styles.description}>
                <Text style={styles.title}>{`${pet.name}, ${pet.age} yr(s), ${pet.sex}`}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  console.log('Mapping state to props', state);
  return {
    saved: state.saved
  };
}

const mapActionsToProps = (dispatch) => ({
  save(pet) {
    return dispatch(ACTION_CREATORS.save_pet(pet));
  }
});

export default connect(mapStateToProps, mapActionsToProps)(SavedScreen);