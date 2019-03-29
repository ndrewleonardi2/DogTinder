import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import Modal from 'react-native-modal';
import { Card, ListItem } from 'react-native-elements'
import ACTION_CREATORS from '../redux/action_creators';
import { connect } from 'react-redux';

class SavedScreen extends Component {
  static navigationOptions = {
    title: 'Saved',
  };
  constructor(props) {
    super(props);
    this.state = {
      target: {},
      isModalVisible: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal(target) {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      target: target
    });
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.props.saved.map((pet) => {
            return (
              <ListItem
                key={pet.id}
                leftAvatar={{ size: 'large', source: { uri: pet.img } }}
                title={<Text style={styles.title}>{`${pet.name}, ${pet.age} yr(s), ${pet.sex}`}</Text>}
                subtitle={pet.profile}
                onPress={this.toggleModal.bind(this, pet)}>
              </ListItem>
            );
          })
        }
        <Modal style={styles.modal} isVisible={this.state.isModalVisible}>
          <Card containerStyle={{ flex: 1 }}
            imageStyle={{ height: 400 }}
            image={{ uri: this.state.target.img }}>
            <Text style={styles.title}>{`${this.state.target.name}, ${this.state.target.age} yr(s), ${this.state.target.sex}`}</Text>
            <Text>{this.state.target.profile}</Text>
          </Card>
          <Button onPress={this.toggleModal} title='Dismiss'></Button>
        </Modal>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  modal: {
    flex: 3,
    backgroundColor: '#fff',
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