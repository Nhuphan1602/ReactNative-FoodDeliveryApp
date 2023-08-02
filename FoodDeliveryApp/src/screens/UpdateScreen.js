
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import UserService from '../services/UserService';
import {GeneralAction} from '../actions';
import {colors, fonts} from '../constants';
import {Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { display } from '../utils';
import { StorageService } from '../services';
import bcrypt from 'bcryptjs';


const UpdateAccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state?.generalState?.userData);
  const [fullName, setFullName] = useState(
    userInfo?.data?.fullName || userInfo?.data?.username,
  );
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(
    userInfo?.data?.dateOfBirth || '',
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(userInfo?.data?.gender || []);
  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);
  const [oldPassword, setOldPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateStatus, setUpdateStatus] = useState(true);

  const checkPassword = async (password) => {
    try {

      const isPasswordMatched = await bcrypt.compare(password, userInfo?.data?.password);
      console.log(password + userInfo?.data?.password)
      console.log(isPasswordMatched)
      if (!isPasswordMatched) {
        setErrorMessage('Old password incorrect');
        setUpdateStatus(false)
      } else {
        setErrorMessage('Correct');
        setUpdateStatus(true)
      }
    } catch (error) {
      console.error('Error comparing passwords:', error);
    }
  };

  const handleUpdate = () => {
    const updatedUserData = {
      fullName,
      gender,
      dateOfBirth,
      password: password ? password : undefined,
    };

    UserService.updateUserData(updatedUserData)
      .then(response => {
        if (response.status) {
          UserService.getUserData().then(userResponse => {
            if (userResponse?.status) {
              console.log(userResponse?.data);
              dispatch(GeneralAction.setUserData(userResponse?.data));
            }
          });
          if(password!='') {

            StorageService.setToken('').then(() => {
              dispatch(GeneralAction.setToken(''));
              dispatch(GeneralAction.setUserData(null));
            });
          } else {
            navigation.pop();
          }


        } else {
          // Handle error
          console.log(response.message);
        }
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });


  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = date => {
    const formattedDate = date.toISOString().split('T')[0];
    setDateOfBirth(formattedDate);
    hideDatePicker();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' behavior for iOS, 'height' behavior for Android
      style={{flex: 1}}>
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
          <Text style={styles.headerText}>Update Account</Text>
          <View>
            <Feather name="bell" size={20} color={colors.DEFAULT_WHITE} />
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>12</Text>
            </View>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Full Name</Text>
            <TextInput
              style={styles.input}
              multiline={false}
              maxLength={50}
              autoCorrect={false}
              autoCapitalize="words"
              placeholder="Please enter your full name"
              placeholderTextColor={colors.DEFAULT_GREY}
              selectionColor={colors.DEFAULT_GREY}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>
          <View style={[styles.sectionContainer, {zIndex: 999}]}>
            <Text style={styles.sectionText}>Gender</Text>
            <DropDownPicker
              open={open}
              value={gender}
              items={items}
              setOpen={setOpen}
              setValue={setGender}
              setItems={setItems}
              style={{borderColor: colors.DEFAULT_GREY}}
            />
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionText}>Date of Birth</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={showDatePicker}>
              <Text style={styles.datePickerText}>
                {dateOfBirth || 'Select date'}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.sectionText}>Old Password</Text>
            <TextInput
              style={styles.input}
              multiline={false}
              maxLength={20}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Please enter old password"
              placeholderTextColor={colors.DEFAULT_GREY}
              selectionColor={colors.DEFAULT_GREY}
              value={oldPassword}
              onChangeText={setOldPassword}
              onEndEditing={({nativeEvent: {text}}) =>
                  checkPassword(text)
                }
            />
          </View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <View style={[styles.sectionContainer, {marginTop: 10}]}>
            <Text style={[styles.sectionText, {marginTop: 0}]}>New Password</Text>
            <TextInput
              style={styles.input}
              multiline={false}
              maxLength={20}
              autoCorrect={false}
              autoCapitalize="none"
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
            disabled={!updateStatus}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 10,
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
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 60,
    backgroundColor: colors.DEFAULT_WHITE,
    elevation: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 30,
    top: -80,
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
    marginTop: 15,
    alignItems: 'center',
  },
  updateButtonText: {
    color: colors.DEFAULT_WHITE,
    fontFamily: fonts.POPPINS_MEDIUM,
    fontSize: 16,
  },
  datePickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.DEFAULT_GREY,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  datePickerText: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 14,
    color: colors.DEFAULT_BLACK,
  },
  inputText: {
    fontSize: 14,
    textAlignVertical: 'center',
    height: display.setHeight(7),
    color: colors.DEFAULT_BLACK,
    flex: 1,
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: colors.DEFAULT_RED,
    fontFamily: fonts.POPPINS_MEDIUM,
  },
});

export default UpdateAccountScreen;