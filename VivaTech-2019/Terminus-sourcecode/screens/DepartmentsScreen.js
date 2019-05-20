import React from 'react';
import {
    View
} from 'react-native';
import { Icon } from 'react-native-elements'

import { ListItem } from 'react-native-elements'

export default class DepartmentsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const item = navigation.getParam('item');
        return {
            title: 'Batch #' + item.id
        };
    };

    render() {
        const { item } = this.props.navigation.state.params;
        return < View >
            {
                item.departments.filter(item => item.data.length).map((item, i) => (
                    <ListItem
                        key={i}
                        title={item.name}
                        onPress={() => {
                            const { navigate } = this.props.navigation;
                            navigate('DepartmentInfo', { item });
                        }}
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
        if (item.name === 'Transfering') {
            return 'globe';
        }
        if (item.name === 'Mining') {
            return 'truck';
        }
        if (item.name === 'Plant') {
            return 'industry';
        }
    }
}