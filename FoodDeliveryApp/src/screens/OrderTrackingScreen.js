import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, fonts } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { display } from '../utils';

const OrderTracking = ({navigation}) => {

    return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Ionicons
              name="chevron-back-outline"
              size={30}
              color={colors.DEFAULT_BLACK}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Order Tracking</Text>
          </View>
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: display.setWidth(75),
    textAlign: 'center',
  },
});

export default OrderTracking;
