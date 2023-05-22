import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import { colors,images,fonts } from '../constants';
import { display } from '../utils';

const SplashScreen = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome')
    }, 1500)
  }, [])
  
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.DEFAULT_GREEN}
        translucent  
      />
      <Image 
        source={images.PLATE}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.titleText}>Food Delivery</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.DEFAULT_GREEN,
  },
  image: {
    height: display.setHeight(30),
    width: display.setWidth(60),
  },
  titleText: {
    color: colors.DEFAULT_WHITE,
    fontSize: 32,
    fontFamily: fonts.POPPINS_LIGHT,
  },
});

export default SplashScreen;
