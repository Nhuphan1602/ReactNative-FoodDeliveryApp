import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, fonts} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useSelector} from 'react-redux';

const OrderTracking = ({navigation}) => {
  const restaurant = {
    lat: 10.8274,
    lng: 106.7049,
    title: 'Restaurant',
    description: 'Fast and Safe',
  }; // Replace with actual data
  const userLocation = useSelector(state => state?.locationState?.location);
  const handleCancel = () => {
    console.log(userLocation?.currentLongitude);
    console.log(userLocation?.currentLatitude);
  };

  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    const fetchedRouteCoordinates = [
      {latitude: restaurant.lat, longitude: restaurant.lng}, // Restaurant coordinates
      {
        latitude: parseFloat(userLocation?.currentLatitude),
        longitude: parseFloat(userLocation?.currentLongitude),
      }, // User location coordinates
    ];
    setRouteCoordinates(fetchedRouteCoordinates);
  }, []);

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

      <MapView
        initialRegion={{
          latitude: parseFloat(userLocation?.currentLatitude),
          longitude: parseFloat(userLocation?.currentLongitude),
          latitudeDelta: 0.014,
          longitudeDelta: 0.014,
        }}
        style={styles.map}
        mapType="standard">
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.lng,
          }}
          title={restaurant.title}
          description={restaurant.description}
          pinColor={colors.ORANGE} // Replace with the desired color from your colors constant
        />

        {userLocation?.currentLatitude && userLocation?.currentLongitude && (
          <Marker
            coordinate={{
              latitude: parseFloat(userLocation.currentLatitude),
              longitude: parseFloat(userLocation.currentLongitude),
            }}
            title="Your Location"
            pinColor={colors.BLUE}
          />
        )}

        {/* Draw the polyline for the route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={colors.DEFAULT_RED}
            strokeWidth={5}
          />
        )}
      </MapView>

      <View style={styles.deliveryInfoContainer}>
        <View style={styles.deliveryDetailsContainer}>
          <View style={styles.deliveryDetails}>
            <Text style={styles.estimatedArrival}>Estimated Arrival</Text>
            <Text style={styles.estimatedTime}>20-30 Minutes</Text>
            <Text style={styles.orderStatus}>Your Order is on its way</Text>
          </View>
          <Image
            style={styles.bikeGuyImage}
            source={require('../assets/images/bikeGuy2.gif')}
          />
        </View>

        <View style={styles.riderInfoContainer}>
          <View style={styles.riderImageContainer}>
            <Image
              style={styles.riderImage}
              source={require('../assets/images/deliveryGuy.png')}
            />
          </View>
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>Alex</Text>
            <Text style={styles.riderText}>Your Rider</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons
                name="call-sharp"
                size={30}
                color={colors.SECONDARY_GREEN}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}>
              <Ionicons
                name="close-sharp"
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: Platform.OS === 'android' ? 1 : 0,
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
    marginLeft: 2,
  },
});

export default OrderTracking;
