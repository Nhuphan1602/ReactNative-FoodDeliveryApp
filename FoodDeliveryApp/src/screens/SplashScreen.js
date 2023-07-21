import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import {colors, images, fonts} from '../constants';
import {display} from '../utils';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.SECONDARY_RED}
        translucent
      />
      <Image
        source={images.WELCOME}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.SECONDARY_RED,
  },
  image: {
    height: display.setHeight(50),
    width: display.setWidth(100),
  },
  titleText: {
    color: colors.DARK_TWO,
    fontSize: 32,
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default SplashScreen;
