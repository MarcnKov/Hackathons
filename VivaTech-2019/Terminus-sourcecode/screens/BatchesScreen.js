import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Text, Divider, Button, Icon, Overlay, Input } from 'react-native-elements';

export default class BatchesScreen extends Component {

  static navigationOptions = {
    title: 'Batches',
  };

  constructor(props) {
    super(props);

    this.state = { isTrackNewDialogVisible: false, list: [], batchId: '', selectedItemId: 0 };
  }

  async componentDidMount() {
    // let response = await fetch("http://localhost:3000/batches?_sort=start");
    // let data = await response.json();
    // this.setState({ list: data });
    var json = require('../db.json');
    this.setState({ list: json.batches });
  }

  render() {
    const { list } = this.state;
    return (
      <View style={{ style: 1 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#EAE9E9',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50
        }}>
          <Text style={styles.listItem}>ID</Text>
          <Text style={styles.listItem}>STAGE</Text>
          <Text style={styles.listItem}>START</Text>
          <Text style={styles.listItem}>COMPLETE</Text>
        </View>
        <View>
          {
            list.filter(item => item.is_observing).map((item, i) => (
              <View key={item.id} style={{ height: 50 }}>
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }} onPress={() => {
                  const { navigate } = this.props.navigation;
                  navigate('Departments', { item });
                }}
                  onLongPress={() => {
                    this.setState({ selectedItemId: item.id });
                  }}>
                  <Text style={styles.listItem}>{item.id}</Text>
                  <Text style={styles.listItem}>{item.stage}</Text>
                  <Text style={styles.listItem}>{item.start}</Text>
                  <Text style={styles.listItem}>{item.complete}</Text>
                </TouchableOpacity>
                <Divider />
              </View>
            ))
          }
        </View>
        <View style={{
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button
            style={{
              width: 150,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            title='Track New'
            onPress={() => {
              this.setState({ isTrackNewDialogVisible: true });
            }}
            icon={
              <Icon
                name="plus"
                size={15}
                padding={10}
                color="white"
                type='font-awesome'
              />
            }>
          </Button>
        </View>
        <Overlay
          isVisible={this.state.isTrackNewDialogVisible}
          onBackdropPress={() => this.setState({ isTrackNewDialogVisible: false })}
          width={250}
          height={200}>
          <View style={{ marginTop: 50 }}>
            <Input
              inputStyle={{ textAlign: 'center' }}
              value={this.state.batchId}
              onChangeText={(batchId) => this.setState({ batchId })}
              placeholder='Plase enter a batch id'
            />
            <View style={{
              paddingTop: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Button
                style={{
                  width: 150,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={this.onAddItem}
                title='Submit'>
              </Button>
            </View>
          </View>
        </Overlay>
        <Overlay
          isVisible={!!this.state.selectedItemId}
          onBackdropPress={() => this.setState({ selectedItemId: 0 })}
          width='auto'
          height='auto'>
          <Button
            style={{
              width: 150,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => this.stopTracking()}
            title='Stop tracking'>
          </Button>
        </Overlay>
      </View >
    )
  }

  onAddItem = async () => {
    const id = this.state.batchId;
    item = this.state.list.find(item => item.id === id);
    // await fetch('http://localhost:3000/batches/' + id, {
    //   method: 'PUT',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     ...item,
    //     is_observing: true,
    //   }),
    // });
    // console.log(item);
    // this.setState({
    //   isTrackNewDialogVisible: false,
    //   batchId: ''
    // });
    this.setState({
      isTrackNewDialogVisible: false,
      batchId: '',
      list: [...this.state.list.filter(item => item.id != id), {
        ...item,
        is_observing: true
      }].sort(function (a, b) {
        return a.id - b.id;
      })
    });
  }

  stopTracking = async () => {
    const { selectedItemId } = this.state;
    this.setState({
      selectedItemId: 0,
      batchId: '',
      list: [...this.state.list.filter(item => item.id != selectedItemId)]
    });
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
})