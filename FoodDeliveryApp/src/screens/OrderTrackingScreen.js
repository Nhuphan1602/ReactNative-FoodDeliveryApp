import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, fonts } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { display } from '../utils';
import MapView, { Marker } from 'react-native-maps';


const OrderTracking = ({ navigation }) => {
  const restaurant = { lat: 37.78825, lng: -122.4324, title: 'Restaurant Title', description: 'Restaurant Description' }; // Replace with actual data

  const handleCancel = () => {
    // Add your cancel logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color={colors.DEFAULT_BLACK}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Add your MapView here */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}
        mapType="standard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.title}
          description={restaurant.description}
          pinColor={colors.ORANGE} // Replace with the desired color from your colors constant
        />
      </MapView>

      <View style={styles.deliveryInfoContainer}>
        <TouchableOpacity style={styles.closeButton}>
          {/* Add your close button content here */}
        </TouchableOpacity>
        <View style={styles.deliveryDetailsContainer}>
          <View style={styles.deliveryDetails}>
            <Text style={styles.estimatedArrival}>Estimated Arrival</Text>
            <Text style={styles.estimatedTime}>20-30 Minutes</Text>
            <Text style={styles.orderStatus}>Your Order is on its way</Text>
          </View>
          <Image style={styles.bikeGuyImage} source={require('../assets/images/bikeGuy2.gif')} />
        </View>


        <View style={styles.riderInfoContainer}>
          <View style={styles.riderImageContainer}>
            <Image style={styles.riderImage} source={require('../assets/images/deliveryGuy.png')} />
          </View>
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>Syed Noman</Text>
            <Text style={styles.riderText}>Your Rider</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons
                name="md-phone-portrait"
                size={30}
                color={colors.ORANGE}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Ionicons
                name="md-close-outline"
                size={30}
                color={colors.DEFAULT_RED}
              />
            </TouchableOpacity>
          </View>
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
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1, // Put the header container above the map
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  map: {
    flex: 1,
  },
  deliveryInfoContainer: {
    position: 'relative',
    backgroundColor: colors.DEFAULT_WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    marginTop: -30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: Platform.OS === "android" ? 1 : 0,
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  deliveryDetails: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  estimatedArrival: {
    fontSize: 14,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.GRAY,
  },
  estimatedTime: {
    fontSize: 30,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.GRAY,
  },
  orderStatus: {
    fontSize: 14,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.GRAY,
  },
  bikeGuyImage: {
    width: 80,
    height: 80,
  },
  riderInfoContainer: {
    backgroundColor: colors.SECONDARY_RED,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  riderImageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 2,
    borderRadius: 40,
  },
  riderImage: { 
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  riderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  riderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  riderText: {
    fontSize: 16,
    color: colors.WHITE,
    fontFamily: fonts.POPPINS_BOLD,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  callButton: {
    backgroundColor: colors.WHITE,
    padding: 5,
    borderRadius: 30,
  },
  cancelButton: {
    backgroundColor: colors.WHITE,
    borderRadius: 30,
    marginLeft: 10,
  },
});

export default OrderTracking;
