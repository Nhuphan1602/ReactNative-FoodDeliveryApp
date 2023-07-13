import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import UserService from '../services/UserService';
import { GeneralAction } from '../actions';
import { colors, fonts, images } from '../constants';
import { display } from '../utils';
import { Separator } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const UpdateAccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state?.generalState?.userData);
  const [username, setUsername] = useState(userInfo?.data?.username);
  const [email, setEmail] = useState(userInfo?.data?.email);
  const [password, setPassword] = useState('');


  const handleUpdate = () => {
    const updatedUserData = {
      username,
      email,
      password: password ? password : undefined,
    };

    UserService.updateUserData(updatedUserData).then(response => {
      if (response.status) {
        // Data updated successfully
        dispatch(GeneralAction.setUserData(response?.data))
        console.log("chỉnh sửa thành công ")
        console.log(response?.data)
        console.log("chỉnh sửa thành công ")

        navigation.navigate('AccountScreen');
      } else {
        // Handle error
        console.log(response.message);
      }
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
  };
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.SECONDARY_RED} translucent />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={colors.DEFAULT_WHITE}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Update Account</Text>
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
      <View style={styles.mainContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Username</Text>
          <TextInput
            style={styles.input}
            multiline={false}
            maxLength={20}
            autoCorrect={false} // Disable auto correction
            autoCapitalize="none" // Disable auto capitalization
            placeholder="Please enter new username" 
            placeholderTextColor={colors.DEFAULT_GREY}
            selectionColor={colors.DEFAULT_GREY}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Email</Text>
          <TextInput
            style={styles.input}
            multiline={false}
            maxLength={20}
            autoCorrect={false} // Disable auto correction
            autoCapitalize="none" // Disable auto capitalization
            placeholder="Please enter new email" 
            placeholderTextColor={colors.DEFAULT_GREY}
            selectionColor={colors.DEFAULT_GREY}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Password</Text>
          <TextInput
            style={styles.input}
            multiline={false}
            maxLength={20}
            autoCorrect={false} // Disable auto correction
            autoCapitalize="none" // Disable auto capitalization
            placeholder="Please enter new password" 
            placeholderTextColor={colors.DEFAULT_GREY}
            selectionColor={colors.DEFAULT_GREY}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdate}
          activeOpacity={0.8}
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </TouchableOpacity>
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
  sectionText: {
    fontSize: 14,
    fontFamily: fonts.POPPINS_SEMI_BOLD,
    lineHeight: 14 * 1.4,
    color: colors.DEFAULT_BLACK,
    marginTop: 25,
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 10
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
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 60,
    backgroundColor: colors.DEFAULT_WHITE,
    elevation: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.DEFAULT_GREY,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: colors.DEFAULT_BLACK,
  },
  updateButton: {
    backgroundColor: colors.SECONDARY_RED,
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  updateButtonText: {
    color: colors.DEFAULT_WHITE,
    fontFamily: fonts.POPPINS_MEDIUM,
    fontSize: 16,
  },
});

export default UpdateAccountScreen;
