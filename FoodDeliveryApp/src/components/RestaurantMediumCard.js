import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors, fonts, images} from '../constants';
import {StaticImageService} from '../services';
import {display} from '../utils';


const RestaurantMediumCard = ({name, images: {logo}, time, distance, tags}) => {
    const shadowStyle = {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.28,
        shadowRadius: 1.0,
        elevation: Platform.OS === "android" ? 1 : 0, // Chỉ áp dụng elevation trên Android
    };

    return (
    <View 
      style={[styles.container, shadowStyle]}
    >
        <Image
            source={{uri: StaticImageService.getLogo(logo)}}
            style={styles.posterStyle}
        />
        <View style={styles.labelContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{name}</Text>
            <View style={styles.rowAndCenter}>
            <FontAwesome />
            <Text style={styles.ratingText}>4.5</Text>
            <Text style={styles.reviewsText}>({10})</Text>
            </View>
        </View>
        <Text 
            numberOfLines={2} 
            style={styles.tagsText}>{tags?.join(' • ')}
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
});

export default RestaurantMediumCard;