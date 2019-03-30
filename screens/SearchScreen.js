import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import { Card } from 'react-native-elements'
import ACTION_CREATORS from '../redux/action_creators';
import { connect } from 'react-redux';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Swipe right to save; left to ignore',
  };
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      type: props.type,
      max: props.max,
      min: props.min,
    };
  }
  componentWillMount() {
    //fetch data from server to populate pet and profile in store
    this.props.fetch_profile()
      .then(this.props.fetch_pets);
  }
  componentWillReceiveProps(props) {
    //Update component state base on stored preferences when modified
    if (!props.loading) {
      let typeChanged = this.state.type !== props.type,
        maxChanged = this.state.max !== props.max,
        minChanged = this.state.min !== props.min;

      if (typeChanged || maxChanged || minChanged) {
        this.setState({
          pets: props.pets,
          max: props.max,
          min: props.min,
          type: props.type
        });

        //Update component state when swippable cards are complete
        if (this.state.done === true) {
          this.setState({ done: false });
        }
      }
    }
  }
  showCard(card) {
    return (
      <Card containerStyle={{ flex: 1, borderWidth: 0 }}
        imageStyle={{ height: 250 }}
        image={{ uri: card.img }}>
        <Text style={styles.title}>{`${card.name}, ${card.age} yr(s), ${card.sex}`}</Text>
        <Text>{card.profile}</Text>
      </Card>
    )
  }
  removed(current) {

    //Track current state of swipped cards and update component state accordingly
    if (current === this.state.pets.length - 1) {
      this.setState({ done: true });
    }
  }
  render() {
    if (this.props.loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.done || this.state.pets.length === 0) {
      let unavailable = 'Sorry, based on your preferences you have seen all the pets we have right now!',
        done = 'That is it! Please check back later';
      return (
        <View style={styles.container}>
          <Text style={styles.message}>
            {this.state.done ? done : unavailable}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SwipeCards
            cards={this.state.pets}
            renderCard={this.showCard}
            showNope={false}
            showYup={false}
            handleYup={(card) => { this.props.save(card) }}
            cardRemoved={this.removed.bind(this)}>
          </SwipeCards>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

//Helper method to filter pets based on user preferences
const filterPets = (data, type, min, max) => {
  return data
    .filter((pet) => {
      return pet.type === type && (min <= pet.age && pet.age <= max);
    });
}

//Helper function to sync redux state with component props
const mapStateToProps = (state) => {
  console.log('###', state)
  let type = state.user.loading ? 'cat' : state.user.data.typePreference,
    max = state.user.loading ? 0 : state.user.data.ageRange.max,
    min = state.user.loading ? 0 : state.user.data.ageRange.min,
    pets = filterPets(state.pets.data, type, min, max);

  return {
    loading: state.pets.loading || state.user.loading,
    pets,
    type,
    max,
    min
  };
}

//Helper function to map methods on props to dispatchable actions
const mapActionsToProps = (dispatch) => ({
  fetch_pets() {
    dispatch(ACTION_CREATORS.get_pets());
    return fetch('https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json')
      .then(res => res.json())
      .then(data => {
        console.log('pets', data)
        dispatch(ACTION_CREATORS.get_pets_success(data));
        return data;
      })
      .catch(error => dispatch(ACTION_CREATORS.get_pets_failure(error)));
  },
  fetch_profile() {
    dispatch(ACTION_CREATORS.get_profile());
    return fetch('https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json')
      .then(res => res.json())
      .then(data => {
        console.log('profile', data)
        dispatch(ACTION_CREATORS.get_profile_success(data));
        return data;
      })
      .catch(error => dispatch(ACTION_CREATORS.get_profile_failure(error)));
  },
  save(pet) {
    return dispatch(ACTION_CREATORS.save_pet(pet));
  },
});

//connect component to redux store
export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);