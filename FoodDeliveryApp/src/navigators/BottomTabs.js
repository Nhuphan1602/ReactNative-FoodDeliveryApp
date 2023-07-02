import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AccountScreen,
  HomeScreen,
  CartScreen
} from '../screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {display} from '../utils';
import {colors} from '../constants';

const BottomTabs = createBottomTabNavigator();

export default () => (
  <BottomTabs.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: display.setHeight(8),
        backgroundColor: colors.DEFAULT_WHITE,
        borderTopWidth: 0,
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.SECONDARY_RED,
      tabBarInactiveTintColor: colors.INACTIVE_GREY,
    }}
    op>
    <BottomTabs.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="home-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="person-outline" size={23} color={color} />
        ),
      }}
    />
    <BottomTabs.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="cart-outline" size={23} color={color} />
        ),
      }}
    />
  </BottomTabs.Navigator>
);