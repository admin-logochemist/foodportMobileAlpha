import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import firebase from "../../firebase.js";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Map({ navigation, ...props }) {
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState("");
  const [origin, setOrigin] = useState({}); //{latitude: 25.0159198, longitude: 67.1294916};
  const [destination, setDestination] = useState({}); //{latitude: 24.895118240675693, longitude: 67.11689262666305};
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const GOOGLE_MAPS_APIKEY = "AIzaSyB5KZy-WiNvS_l7AjO-lV-eNdSaPBVLuyg";
  var mapView = "";

  const getLocation = async () => {
    try {
      const subscription = await Location.watchPositionAsync(
        {},
        async (location) => {
          setLocation(location);
          setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          console.log(location);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getMarkers = () => {
    setInterval(async () => {
      firebase
        .firestore()
        .collection("mapmarkers")
        .where("isonline", "==", true)
        .onSnapshot((snapshot) => {
          let tempdata = [];

          snapshot.docs.map((doc) => {
            tempdata.push({ ...doc.data() });
          });

          setMarkers(tempdata);
        });
    }, 5000);
  };

  useEffect(() => {
    getLocation();
    getMarkers();
  }, []);

  return (
    <>
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={37} />
          <Text style={{ fontSize: 27, textAlign: "center" }}>GoBack</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", height: "100%" }}>
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: location?.coords.latitude || 25.0158546,
            longitude: location?.coords.longitude || 67.21422,
            latitudeDelta: 0.15,
            longitudeDelta: 0.25,
          }}
          annotations={markers}
          showsUserLocation={true}
          ref={(c) => (mapView = c)}
        >
          {origin && destination ? (
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
              onReady={(result) => {
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
          ) : (
            <></>
          )}
          {markers.map((mk, i) => (
            <Marker
              key={i + `${new Date().getMilliseconds()}`}
              coordinate={{
                latitude: mk.latitude,
                longitude: mk.longitude,
              }}
              tracksViewChanges={true}
              title={mk.name}
              description={mk.description}
              onPress={(res) => {
                setDestination({
                  latitude: mk.latitude,
                  longitude: mk.longitude,
                });
              }}
            />
          ))}

          <View>
            <Text>
              distance: {distance.toFixed(2)} km - time: {duration.toFixed(0)}{" "}
              mins
            </Text>
          </View>
        </MapView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    width: 350,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,

    elevation: 5,
  },
});
