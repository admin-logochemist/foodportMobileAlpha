import { View, StyleSheet } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import firebase from "../../firebase.js";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map({ navigation, ...props }) {
  const [markers, setMarkers] = useState([]);
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      const subscription = await Location.watchPositionAsync(
        {},
        async (location) => {
          setLocation(location);
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
    }, 10000);
  };

  useEffect(() => {
    getLocation();
    getMarkers();
  }, []);

  return (
    <>
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
        >
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
            />
          ))}
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
