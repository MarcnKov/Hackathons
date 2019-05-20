import React from 'react';
import {
    View
} from 'react-native';
import { Icon, Button, Text } from 'react-native-elements'
import { createOpenLink } from 'react-native-open-maps';
import { ListItem } from 'react-native-elements'

export default class DepartmentInfoScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const item = navigation.getParam('item');
        console.log(item);
        return {
            title: item.name + ' Info',
        };
    };

    render() {
        const { item } = this.props.navigation.state.params;
        return <View style={{ flex: 1 }}>
            < View >
                {
                    item.data.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.name}
                            subtitle={this.getSubtitle(item)}
                            rightElement={() => this.getActionButton(item)}
                            bottomDivider={true}
                            leftIcon={<Icon
                                name={item.icon}
                                type='font-awesome'
                            />}
                        />
                    ))
                }
            </View >
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
                    title='Comments'
                    icon={
                        <Icon
                            name="comments"
                            size={15}
                            padding={10}
                            color="white"
                            type='font-awesome'
                        />
                    }>
                </Button>
            </View>
        </View>
    }

    getSubtitle = (item) => {
        if (item.values) {
            let contactValues = '';
            item.values.forEach(element => {
                contactValues = contactValues + (element + '\n');
            });
            return <Text style={{ color: 'grey' }}>{contactValues}</Text>
        } else {
            return <Text style={{ color: 'grey' }}>{item.value}</Text>
        };
    }

    getActionButton = (item) => {
        return <Button
            title={item.name === 'Location' ? "Map" : 'Compare With'}
            onPress={() => {
                if (item.name === 'Location') {
                    const openLocationZoomedOut = createOpenLink({ ...item.latlong, zoom: 13 });
                    openLocationZoomedOut();
                }
            }}
            type="outline"
        />
    };
}