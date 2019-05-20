import React from 'react';
import {
  View
} from 'react-native';
import { Icon } from 'react-native-elements'

import { ListItem } from 'react-native-elements'
import { getInsights } from '../insighter/Insighter';

export default class InsightsScreen extends React.Component {

  static navigationOptions = {
    title: 'Insights',
  };

  constructor(props) {
    super(props);

    this.state = { list: [] };
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
    return < View >
      {
        getInsights(list).map((item, i) => (
          <ListItem
            key={i}
            title={item.name}
            bottomDivider={true}
            leftIcon={<Icon
              name={this.getItemIcon(item)}
              type='font-awesome'
            />}
          />
        ))
      }
    </View >
  }

  getItemIcon = (item) => {
    if (item.type === 'warning') {
      return 'exclamation-triangle';
    }
    if (item.type === 'error') {
      return 'times';
    }
  }
}