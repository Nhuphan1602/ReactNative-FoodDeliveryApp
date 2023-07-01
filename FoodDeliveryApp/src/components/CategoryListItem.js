import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../constants';

const CategoryListItem = ({name, isActive, selectCategory}) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          isActive ? styles.activeCategoryText : styles.inActiveCategoryText
        }
        onPress={() => selectCategory(name)}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT_YELLOW,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: 'center',
  },
  activeCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.DEFAULT_BLACK,
  },
  inActiveCategoryText: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    color: colors.INACTIVE_GREY,
  },
});

export default CategoryListItem;