import React, { Component } from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import ACTION_CREATORS from '../redux/action_creators';
import { connect } from 'react-redux';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Adopter Profile',
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={styles.page}>
        <View style={styles.card}>
          <Text>{this.props.profile}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.h1}>{`Preferences`}</Text>
          <View style={styles.typeGroup}>
            <Text style={styles.typeGroupSide}>{`Animal`}</Text>
            <View style={styles.typeGroupSide}>
              <View style={styles.typeGroup}>
                <Text style={styles.typeGroupSide}>{`Cat`}</Text>
                <Switch
                  style={styles.typeGroupSide}
                  onValueChange={this.props.update_type}
                  value={this.props.type}></Switch>
                <Text style={styles.typeGroupSide}>{`Dog`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.typeGroup}>
            <Text style={styles.typeGroupSide}>{`Age`}</Text>
            <TextInput
              style={styles.input}
              onChangeText={this.props.update_min}
              value={this.props.min}
            />
            <TextInput
              style={styles.input}
              onChangeText={this.props.update_max}
              value={this.props.max}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  card: {
    flex: 2,
    justifyContent: 'center'
  },
  typeGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  typeGroupSide: {
    flex: 2
  },
  input: {
    flex: 2,
    borderWidth: 1,
    height: 50
  }
});

//Helper function to sync redux state with component props
const mapStateToProps = (state) => {
  return {
    max: state.user.data.ageRange.max.toString(),
    min: state.user.data.ageRange.min.toString(),
    profile: state.user.data.profile,
    type: state.user.data.typePreference === 'dog'
  };
}

//Helper function to map methods on props to dispatchable actions
const mapActionsToProps = (dispatch) => ({
  update_max(max) {
    return dispatch(ACTION_CREATORS.update_max_age(max));
  },
  update_min(min) {
    return dispatch(ACTION_CREATORS.update_min_age(min));
  },
  update_type(type) {
    dispatch(ACTION_CREATORS.save_pet_preference_change());
    dispatch(ACTION_CREATORS.update_type_preference(type));
  }
});

//connect component to redux store
export default connect(mapStateToProps, mapActionsToProps)(SettingsScreen);