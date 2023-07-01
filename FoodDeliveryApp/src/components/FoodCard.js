import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apiConstants, colors, fonts} from '../constants';
import {StaticImageService} from '../services';
import {display} from '../utils';

const FoodCard = ({id, name, description, price, image, navigate}) => {
    const [itemCount, setItemCount] = useState(0)

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
            <Image
            style={styles.image}
            source={{
                uri: StaticImageService.getGalleryImage(
                image,
                apiConstants.STATIC_IMAGE.SIZE.SQUARE,
                ),
            }}
            />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
            <TouchableOpacity onPress={() => navigate()} activeOpacity={0.8}>
            <Text numberOfLines={1} style={styles.titleText}>
                {name}
            </Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
                {description}
            </Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
            <Text style={styles.priceText}>$ {price}</Text>
            <View style={styles.itemAddContainer}>
                {itemCount > 0 ? (
                <>
                    <AntDesign
                        name="minus"
                        color={colors.DEFAULT_YELLOW}
                        size={18}
                        onPress={() => setItemCount(itemCount - 1)}
                    />
                    <Text style={styles.itemCountText}>{itemCount}</Text>
                </>
                ) : null}
                <AntDesign
                    name="plus"
                    color={colors.DEFAULT_YELLOW}
                    size={18}
                    onPress={() => setItemCount(itemCount + 1)}
                />
            </View>
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 2,
    backgroundColor: colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: display.setWidth(60),
    color: colors.DEFAULT_BLACK,
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: display.setWidth(60),
    color: colors.DEFAULT_GREY,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    marginBottom: 8,
  },
  priceText: {
    color: colors.DEFAULT_YELLOW,
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: colors.DEFAULT_BLACK,
    fontFamily: fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
});

export default FoodCard;