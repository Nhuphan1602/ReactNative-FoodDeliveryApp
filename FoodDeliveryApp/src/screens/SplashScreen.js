import React, { useEffect } from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import { colors,images,fonts, } from '../constants';
import { display } from '../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.SECONDARY_RED}
        translucent  
      />
      <Image 
        source={images.LOGO}
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
    backgroundColor: colors.DEFAULT_WHITE,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    // height: display.setHeight(50),
    // width: display.setWidth(90),
  },
  titleText: {
    color: colors.DARK_TWO,
    fontSize: 32,
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default SplashScreen;
