import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import BatchesScreen from '../screens/BatchesScreen';
import InsightsScreen from '../screens/InsightsScreen';
import DepartmentsScreen from '../screens/DepartmentsScreen';
import DepartmentInfoScreen from '../screens/DepartmentInfoScreen';

const BatchesStack = createStackNavigator({
  Batches: BatchesScreen,
  Departments: DepartmentsScreen,
  DepartmentInfo: DepartmentInfoScreen
});

BatchesStack.navigationOptions = {
  tabBarLabel: 'Batches',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'logo-buffer'}
    />
  ),
};

const InsightsStack = createStackNavigator({
  Insights: InsightsScreen,
});

InsightsStack.navigationOptions = {
  tabBarLabel: 'Insights',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-color-wand'}
    />
  ),
};

export default createBottomTabNavigator({
  BatchesStack,
  InsightsStack,
});
