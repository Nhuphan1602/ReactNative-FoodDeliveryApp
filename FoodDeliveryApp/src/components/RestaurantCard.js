import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, fonts} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StaticImageService} from '../services';
import {useDispatch, useSelector} from 'react-redux';
import {BookmarkAction} from '../actions';
import { display } from '../utils';

const RestaurantCard = ({
  id,
  name,
  images: {poster},
  tags,
  distance,
  time,
  navigate,
  reviews,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.8} 
      onPress={() => navigate(id)}>
        <Image
            source={{uri: StaticImageService.getPoster(poster)}}
            style={styles.posterStyle}
        />
        <Text style={styles.titleText}>{name}</Text>
        <Text
            numberOfLines={1} 
            style={styles.tagText}>{tags?.join(' • ')}
        </Text>
        <View style={styles.footerContainer}>
        <View style={styles.rowAndCenter}>
            <FontAwesome name="star" size={14} color={colors.DEFAULT_YELLOW} />
            <Text style={styles.ratingText}>4 </Text>
            <Text style={styles.reviewsText}>({10})</Text>
        </View>
        <View style={styles.rowAndCenter}>
            <View style={styles.timeAndDistanceContainer}>
                <Ionicons
                    name="location-outline"
                    color={colors.DEFAULT_YELLOW}
                    size={15}
                />
                <Text style={styles.timeAndDistanceText}>{distance}</Text>
            </View>
            <View style={styles.timeAndDistanceContainer}>
                <Ionicons
                    name="ios-time-outline"
                    color={colors.DEFAULT_YELLOW}
                    size={15}
                />
                <Text style={styles.timeAndDistanceText}>{time}</Text>
            </View>
        </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.DEFAULT_WHITE,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 5,
  },
  posterStyle: {
    width:  display.setWidth(70),
    height:  display.setWidth(40),
    borderRadius: 10,
    margin: 5,
  },
  titleText: {
    marginLeft: 8,
    fontSize: 15,
    lineHeight: 15 * 1.4,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    color: colors.DEFAULT_BLACK,
  },
  tagText: {
    marginLeft: 8,
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.DEFAULT_GREY,
    marginBottom: 5,
    width: display.setWidth(70),
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 6,
    justifyContent: 'space-between',
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAndDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: colors.LIGHT_YELLOW,
    borderRadius: 12,
    marginHorizontal: 3,
  },
  timeAndDistanceText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.DEFAULT_YELLOW,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.DEFAULT_BLACK,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.DEFAULT_BLACK,
  },
  bookmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
});


export default RestaurantCard;