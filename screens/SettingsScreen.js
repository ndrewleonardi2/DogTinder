import React from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import Dimensions from 'Dimensions';
import user from '../user';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Adopter Profile',
  };
  constructor(props) {
    super(props);
    this.state = {
      min: user.ageRange.min.toString(),
      max: user.ageRange.max.toString(),
      type: user.typePreference === 'dog'
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle(type) {
    this.setState({ type })
  }
  render() {
    return (
      <View
        style={styles.page}>
        <View style={styles.card}>
          <Text>{user.profile}</Text>
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
                  onValueChange={this.toggle}
                  value={this.state.type}></Switch>
                <Text style={styles.typeGroupSide}>{`Dog`}</Text>
              </View>
            </View>
          </View>
          <View style={styles.typeGroup}>
            <Text style={styles.typeGroupSide}>{`Age`}</Text>
            <TextInput
              style={styles.input}
              onChangeText={(min) => this.setState({ min })}
              value={this.state.min}
            />
            <TextInput
              style={styles.input}
              onChangeText={(max) => this.setState({ max })}
              value={this.state.max}
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
