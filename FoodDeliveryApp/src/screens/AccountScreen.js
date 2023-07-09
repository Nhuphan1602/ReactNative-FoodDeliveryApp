import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Separator, ToggleButton } from '../components';
import {colors, fonts, images} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {display} from '../utils';
import {useDispatch} from 'react-redux';
import {StorageService} from '../services';
import {GeneralAction} from '../actions';
import { useSelector } from 'react-redux';

const AccountScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const logout = () => {
    StorageService.setToken('').then(() => {
      dispatch(GeneralAction.setToken(''));
      dispatch(GeneralAction.setUserData(null));
    });
  };
  const userInfo = useSelector(
      state => state?.generalState?.userData);
  console.log(userInfo);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.SECONDARY_RED}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={colors.DEFAULT_WHITE}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Account</Text>
        <View>
          <Feather name="bell" size={20} color={colors.DEFAULT_WHITE} />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
      </View>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={images.AVATAR} />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.nameText}>{userInfo?.data?.username}</Text>
          <Text style={styles.emailText}>{userInfo?.data?.email}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View style={styles.menuIcon}>
            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={18}
              color={colors.SECONDARY_RED}
            />
          </View>
          <Text style={styles.menuText}>My All {'\n'}Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View style={{...styles.menuIcon, backgroundColor: colors.LIGHT_RED}}>
            <MaterialCommunityIcons
              name="gift-outline"
              size={18}
              color={colors.SECONDARY_RED}
            />
          </View>
          <Text style={styles.menuText}>Offers {'&\n'} Promos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View
            style={{...styles.menuIcon, backgroundColor: colors.LIGHT_YELLOW}}>
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.SECONDARY_RED}
            />
          </View>
          <Text style={styles.menuText}>Delivery Addresses</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.sectionHeaderText}>My Account</Text>
        <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="person-outline"
              size={18}
              color={colors.DEFAULT_RED}
            />
            <Text style={styles.sectionText}>Manage Profile</Text>
          </View>
          <Feather
            name="chevron-right"
            color={colors.INACTIVE_GREY}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="card-outline"
              size={18}
              color={colors.DEFAULT_RED}
            />
            <Text style={styles.sectionText}>Payment</Text>
          </View>
          <Feather
            name="chevron-right"
            color={colors.INACTIVE_GREY}
            size={20}
          />
        </TouchableOpacity>

        <Text style={styles.sectionHeaderText}>Notification</Text>
        <View style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Feather name="bell" size={18} color={colors.DEFAULT_RED} />
            <Text style={styles.sectionText}>Notification</Text>
          </View>
          <ToggleButton size={0.5} />
        </View>
        <View style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Feather name="bell" size={18} color={colors.DEFAULT_RED} />
            <Text style={styles.sectionText}>Promos & Offers Notification</Text>
          </View>
          <ToggleButton size={0.5} />
        </View>

        <Text style={styles.sectionHeaderText}>More</Text>
        <View style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="ios-color-palette-outline"
              size={18}
              color={colors.DEFAULT_RED}
            />
            <Text style={styles.sectionText}>Dark Mode</Text>
          </View>
          <ToggleButton size={0.5} />
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionTextContainer}
            activeOpacity={0.8}
            onPress={() => logout()}>
            <MaterialCommunityIcons
              name="logout"
              size={18}
              color={colors.DEFAULT_RED}
            />
            <Text style={styles.sectionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: colors.SECONDARY_RED,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 45,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    color: colors.DEFAULT_WHITE,
  },
  alertBadge: {
    backgroundColor: colors.DEFAULT_YELLOW,
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    fontSize: 10,
    fontFamily: fonts.POPPINS_BOLD,
    lineHeight: 10 * 1.4,
    color: colors.DEFAULT_WHITE,
  },
  profileHeaderContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImageContainer: {
    backgroundColor: colors.DEFAULT_WHITE,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    elevation: 3,
  },
  profileImage: {
    width: display.setWidth(15),
    height: display.setWidth(15),
    borderRadius: 32,
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 15,
    fontFamily: fonts.POPPINS_REGULAR,
    lineHeight: 14 * 1.4,
    color: colors.DEFAULT_WHITE,
    paddingBottom: 2,
  },
  emailText: {
    fontSize: 14,
    fontFamily: fonts.POPPINS_REGULAR,
    lineHeight: 12 * 1.4,
    color: colors.DEFAULT_WHITE,
  },
  menuContainer: {
    backgroundColor: colors.DEFAULT_WHITE,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 45,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
  },
  menuIcon: {
    backgroundColor: colors.LIGHT_YELLOW,
    height: display.setWidth(8),
    width: display.setWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  menuText: {
    fontSize: 12,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    lineHeight: 12 * 1.4,
    color: colors.DEFAULT_BLACK,
    textAlign: 'center',
    marginTop: 5,
  },
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: colors.DEFAULT_WHITE,
    elevation: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 20,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    lineHeight: 14 * 1.4,
    color: colors.DEFAULT_BLACK,
    marginTop: 25,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  sectionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 13,
    fontFamily: fonts.POPPINS_REGULAR,
    lineHeight: 13 * 1.4,
    color: colors.INACTIVE_GREY,
    marginLeft: 10,
  },
});

export default AccountScreen;