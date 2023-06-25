import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { colors, fonts, images } from '../constants';

const CategoryMenuItem = ({name, logo, activeCategory, setActiveCategory}) => {
  return (
    <TouchableOpacity
      onPress={() => setActiveCategory(name)}
      style={styles.category()}>
      <Image
        source={images[logo]}
        style={styles.categoryIcon(activeCategory === name)}
      />
      <Text style={styles.categoryText(activeCategory === name)}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: (marginTop = 0) => ({
    alignItems: 'center',
    marginTop,
  }),
  categoryIcon: isActive => ({
    height: 30,
    width: 30,
    opacity: isActive ? 1 : 0.5,
  }),
  categoryText: isActive => ({
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.DEFAULT_WHITE,
    marginTop: 5,
    opacity: isActive ? 1 : 0.5,
  }),
});

export default CategoryMenuItem;