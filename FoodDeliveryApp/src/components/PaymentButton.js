import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { colors, fonts } from '../constants';

const PaymentButton = ({
  text = 'DONE',
  onPress = () => {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={{
          ...styles.container,
          backgroundColor: !disabled? colors.SECONDARY_RED: colors.DEFAULT_GREY,
        }} 
        disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: fonts.POPPINS_MEDIUM,
    fontSize: 16,
    color: 'white',
  },
});

export default PaymentButton;
