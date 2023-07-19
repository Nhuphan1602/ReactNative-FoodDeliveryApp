import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { colors, fonts, images } from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StaticImageService } from '../services';
import { display } from '../utils';
import { BookmarkAction } from '../actions';

const RestaurantMediumCard = ({ name, images: { logo }, time, distance, tags, id }) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector(
    state => state?.bookmarkState?.bookmarks?.some(item => item?.restaurantId === id)
  );

  const handleBookmark = () => {
    dispatch(
      isBookmarked
        ? BookmarkAction.removeBookmark({ restaurantId: id })
        : BookmarkAction.addBookmark({ restaurantId: id })
    );
  };

  return (
    <View style={[styles.container, styles.shadowStyle]}>
      <Image
        source={{ uri: StaticImageService.getLogo(logo) }}
        style={styles.posterStyle}
      />
      <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{name}</Text>
          <View style={styles.rowAndCenter}>
            <FontAwesome name="star" size={14} color={colors.DEFAULT_YELLOW} />
            <Text style={styles.ratingText}>4.5</Text>
            <Text style={styles.reviewsText}>({10})</Text>
          </View>
        </View>
        <Text
          numberOfLines={2}
          style={styles.tagsText}
        >
          {tags?.join(' • ')}
        </Text>
        <View style={styles.deliveryDetailsContainer}>
          <View style={styles.rowAndCenter}>
            <Image
              source={images.DELIVERY_CHARGE}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>Free Delivery</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image
              source={images.DELIVERY_TIME}
              style={styles.deliveryDetailsIcon}
            />
            <Text style={styles.deliveryDetailsText}>{time} min</Text>
          </View>
          <View style={styles.rowAndCenter}>
            <Image style={styles.deliveryDetailsIcon} />
            <Text style={styles.deliveryDetailsText}>{distance}</Text>
          </View>
        </View>
      </View>
      {isBookmarked && (
        <TouchableOpacity
          style={styles.bookmarkIcon}
          activeOpacity={0.8}
          onPress={handleBookmark}
        >
          <FontAwesome
            name={isBookmarked ? 'bookmark' : 'bookmark-o'}
            size={24}
            color={isBookmarked ? colors.DEFAULT_YELLOW : colors.DEFAULT_GREY}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: colors.DEFAULT_WHITE,
    marginTop: 8,
  },
  posterStyle: {
    width: display.setWidth(20),
    height: display.setWidth(20),
    borderRadius: 10,
    margin: 5,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.DEFAULT_BLACK,
    marginBottom: 5,
  },
  tagsText: {
    fontSize: 11,
    lineHeight: 11 * 1.4,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.DEFAULT_GREY,
    marginBottom: 7,
  },
  deliveryDetailsText: {
    marginLeft: 3,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    color: colors.DEFAULT_BLACK,
  },
  deliveryDetailsIcon: {
    height: 16,
    width: 16,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.DEFAULT_YELLOW,
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.DEFAULT_YELLOW,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 1,
    left: 68,
    zIndex: 10,
  },
});

export default RestaurantMediumCard;
