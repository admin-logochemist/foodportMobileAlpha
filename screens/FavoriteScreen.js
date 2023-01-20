import { View, Text, StyleSheet } from 'react-native'
import React , { useState, useEffect} from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function FavoriteScreen() {

   const [loc , setLoc] = useState();
console.log(loc, 'dsujnfslkjhfsdfkjjfsdjk')

  const getLocation = async () => {
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }
    try {
      const subscription = await Location.watchPositionAsync({}, (location) => {
        // console.log(location ,'sdfgfsdsdsssssssssssssss');
        // subscription.remove();
        setLoc(location);
    });

    } catch (error){
        console.log(error);
    }
    
  }

useEffect(() => {
  getLocation();

}, [])



  return (
    
    <View>
    <MapView
      style={styles.mapStyle}
      initialRegion={loc}
    >
    <Marker
        coordinate={{
          latitude: loc?.coords.latitude,
          longitude: loc?.coords.longitude,
        }}
        title={"You are here"}
        description={"Marker Description"}
        style={styles.markerStyle}
      >
      </Marker>
    </MapView>
    </View>
  )
}
const styles = StyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  markerStyle: {
    backgroundColor: 'red',
    width: 90,
    height: 90,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});