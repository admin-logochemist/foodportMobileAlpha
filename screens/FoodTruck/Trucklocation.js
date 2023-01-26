import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import firebase from "../../firebase.js";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";


export default function Trucklocation({ route, navigation }) {

    const [foods, setFood] = useState([]);
  const [usertype, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState(foods[0]?.latitude);
  const [long, setLong] = useState(foods[0]?.longitude);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const origin = {latitude: 25.0159198, longitude: 67.1294916};
    const destination = {latitude: 24.895118240675693, longitude: 67.11689262666305};
    const GOOGLE_MAPS_APIKEY = 'AIzaSyB5KZy-WiNvS_l7AjO-lV-eNdSaPBVLuyg';
    var mapView = "";

    // const { name, lat, long, about, id } = props.route.params;



    const getData = () => {
        try {
          AsyncStorage.getItem("userType").then((valuez) => {
            if (valuez) {
              setUserType(JSON.parse(valuez));
    
              firebase
                .firestore()
                .collection("resturant")
                .doc(route.params.id)
                .onSnapshot((snapshot) => {
                  let _newData = snapshot.data();
    
                  setLat(_newData.latitude);
                  setLong(_newData.longitude);
                  if (JSON.parse(valuez) === "business") {
                    // shouldUpdateLocation();
                  }
                  setShowMap(true);
                });
            }
          });
        } catch (error) {
          console.log(error);
        }
    
        try {
          AsyncStorage.getItem("email").then((value) => {
            if (value) {
              setEmail(JSON.parse(value));
            }
          });
        } catch (error) {
          console.log(error);
        }
      };
    
      async function shouldUpdateLocation() {
        setInterval(async () => {
          // if (route.params.remail === email) {
          const db = firebase.firestore();
          try {
            const subscription = await Location.watchPositionAsync(
              {},
              async (location) => {
                const { latitude, longitude } = location.coords;
                let thisMarkerID = null;
    
                db.collection("mapmarkers")
                  .where("truckId", "==", route.params.id)
                  .onSnapshot((snapshot) => {
                    thisMarkerID = snapshot?.docs[0]?.id;
                  });
    
                await db.collection("resturant").doc(route.params.id).update({
                  latitude,
                  longitude,
                });
    
                if (thisMarkerID) {
                  await db.collection("mapmarkers").doc(thisMarkerID).update({
                    latitude,
                    longitude,
                    isonline: true,
                  });
                } else {
                  db.collection("mapmarkers").add({
                    latitude,
                    longitude,
                    isonline: true,
                    truckId: route.params.id,
                  });
                }
              }
            );
          } catch (error) {
            console.log(error);
          }
        }, 20000);
      }
    
      useEffect(() => {
        getData();
        firebase
          .firestore()
          .collection("food")
          .where("id", "==", route.params.id)
          .onSnapshot((snapshot) => {
            let _newData = snapshot?.docs[0]?.data();
            setFood([_newData]);
          });
      }, []);

    
  return (
    <SafeAreaView>
    <ScrollView>
   <View style={{ marginBottom: 1, backgroundColor:"red" }}>
   <Text style={{
    textAlign: "center",
    fontSize:30,
    fontWeight:"bold",
    color:"white",
    padding:10
}}>
   {route.params.name}</Text>
   </View>
   <View style={{alignItems:"center"}}>
   <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.goBack()}>
   <AntDesign name="back" size={37} />
   <Text style={{fontSize:27, textAlign:"center"}}>GoBack</Text>
   </TouchableOpacity>
   </View>
    <View style={{ width: "100%", height: 650}}>
    
    {showMap ? (
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.15,
            longitudeDelta: 0.25,
          }}
          showsUserLocation={true}
          ref={c => mapView = c}
        >
          <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={4}
              strokeColor="lightblue"
              precision="low"
              timePrecision="now"
              mode="DRIVING"
              tappable={true}
              onReady={result => {
                  setDistance(result.distance);
                  setDuration(result.duration);
                  
                  if (mapView) {
                      mapView.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                          right: 100 / 20,
                          bottom: 100 / 20,
                          left: 100 / 20,
                          top: 100 / 20,
                        },
                      });
                  }
                }}
          />
          <Marker
            key={`${new Date().getMilliseconds()}`}
            coordinate={{
              latitude: lat,
              longitude: long,
            }}
            title={route.params.name}
            description={route.params.about}
          />
          <View>
              <Text style={{color:"white", fontSize: 22}}>Distance: {distance.toFixed(2)} km - time: {duration.toFixed(0)} mins</Text>
          </View>
        </MapView>
      ) : (
        <></>
      )}
  </View>
 
  </ScrollView>
  </SafeAreaView>
  )
}