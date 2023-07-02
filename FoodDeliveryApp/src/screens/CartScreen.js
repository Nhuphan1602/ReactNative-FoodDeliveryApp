import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors,fonts,images } from '../constants';
import {FoodCard, Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { display } from '../utils';
import {useSelector} from 'react-redux';

const CartScreen = ({navigation}) => {
  const cart = useSelector(state => state?.cartState?.cart);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      {cart?.cartItems?.length > 0 ? (
        <>
          <ScrollView>
            <View style={styles.foodList}>
              {cart?.cartItems?.map(item => (
                <FoodCard
                  {...item?.food}
                  key={item?.food?.id}
                  navigate={() =>
                    navigation.navigate('Food', {foodId: item?.id})
                  }
                />
              ))}
            </View>
            <View style={styles.promoCodeContainer}>
              <View style={styles.rowAndCenter}>
                <Entypo name="ticket" size={30} color={colors.SECONDARY_RED} />
                <Text style={styles.promoCodeText}>Add Promo Code</Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={colors.DEFAULT_BLACK}
              />
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Item Total</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.itemsTotal?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Discount</Text>
                <Text style={styles.amountText}>
                  $ {cart?.metaData?.discount?.toFixed(2)}
                </Text>
              </View>
              <View style={styles.amountSubContainer}>
                <Text style={styles.amountLabelText}>Delivery Fee</Text>
                <Text
                  style={{...styles.amountText, color: colors.SECONDARY_RED}}>
                  Free
                </Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <View style={styles.rowAndCenter}>
                <Ionicons
                  name="cart-outline"
                  color={colors.DEFAULT_WHITE}
                  size={20}
                />
                <Text style={styles.checkoutText}>Checkout</Text>
              </View>
              <Text style={styles.checkoutText}>
                $ {cart?.metaData?.grandTotal?.toFixed(2)}
              </Text>
            </TouchableOpacity>
            <Separator height={display.setHeight(9)} />
          </ScrollView>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            style={styles.emptyCartImage}
            source={images.EMPTY_CART}
            resizeMode="contain"
          />
          <Text style={styles.emptyCartText}>Cart Empty</Text>
          <Text style={styles.emptyCartSubText}>
            Go ahead and order some tasty food
          </Text>
          <TouchableOpacity style={styles.addButtonEmpty}>
            <AntDesign name="plus" color={colors.DEFAULT_WHITE} size={20} />
            <Text style={styles.addButtonEmptyText}>Add Food</Text>
          </TouchableOpacity>
          <Separator height={display.setHeight(15)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: display.setWidth(75),
    textAlign: 'center',
  },
  foodList: {
    marginHorizontal: display.setWidth(4),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: display.setWidth(4),
    paddingVertical: 15,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'space-between',
  },
  promoCodeText: {
    fontSize: 15,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 15 * 1.4,
    color: colors.DEFAULT_BLACK,
    marginLeft: 10,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountContainer: {
    marginHorizontal: display.setWidth(4),
    paddingVertical: 20,
    borderBottomWidth: 0.5,
  },
  amountSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 3,
  },
  amountLabelText: {
    fontSize: 15,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: colors.SECONDARY_RED,
  },
  amountText: {
    fontSize: 15,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    lineHeight: 15 * 1.4,
    color: colors.DEFAULT_BLACK,
  },
  totalContainer: {
    marginHorizontal: display.setWidth(4),
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    lineHeight: 20 * 1.4,
    color: colors.DEFAULT_BLACK,
  },
  checkoutButton: {
    flexDirection: 'row',
    width: display.setWidth(80),
    backgroundColor: colors.SECONDARY_RED,
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: display.setHeight(7),
    marginTop: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 16 * 1.4,
    color: colors.DEFAULT_WHITE,
    marginLeft: 8,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 30,
    fontFamily: fonts.POPPINS_LIGHT,
    lineHeight: 30 * 1.4,
    color: colors.SECONDARY_RED,
  },
  emptyCartSubText: {
    fontSize: 12,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: colors.INACTIVE_GREY,
  },
  addButtonEmpty: {
    flexDirection: 'row',
    backgroundColor: colors.SECONDARY_RED,
    borderRadius: 8,
    paddingHorizontal: display.setWidth(4),
    paddingVertical: 5,
    marginTop: 10,
    justifyContent: 'space-evenly',
    elevation: 3,
    alignItems: 'center',
  },
  addButtonEmptyText: {
    fontSize: 12,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 12 * 1.4,
    color: colors.DEFAULT_WHITE,
    marginLeft: 10,
  },
  emptyCartImage: {
    height: display.setWidth(60),
    width: display.setWidth(60),
  },
});

export default CartScreen;