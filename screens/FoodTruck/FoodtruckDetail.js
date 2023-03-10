import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import AboutFtruck from "../../components/foodtruck/AboutFtruck.js";
import Fmenuitems from "../../components/foodtruck/Fmenuitems.js";
import ViewCart from "../../components/restaurantDetail/ViewCart.js";
import Button from "../../components/foodtruck/Button.js";
import firebase from "../../firebase.js";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function FoodtruckDetail({ route, navigation }) {
  const [isOnline, setIsOnline] = useState(false);
  const [foods, setFood] = useState([]);
  const [usertype, setUserType] = useState("");
  const [lat, setLat] = useState(foods[0]?.latitude);
  const [long, setLong] = useState(foods[0]?.longitude);

  const updateOnline = () => {
    setIsOnline(!isOnline);

    firebase.firestore().collection("resturant").doc(route.params.id).update({
      isonline: !isOnline,
    });
  };

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

              setIsOnline(_newData.isonline);
              setLat(_newData.latitude);
              setLong(_newData.longitude);

              if (JSON.parse(valuez) === "business" && isOnline) {
                shouldUpdateLocation();
              }
            });
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

  const AddFoodItems = () => {
    navigation.navigate("AddFoodItems", {
      name: route.params.name,
      id: route.params.id,
      remail: route.params.remail,
    });
  };

  const ForLocation = () => {
    navigation.navigate("Trucklocation", {
      name: route.params.name,
      lat: lat,
      long: long,
      about: route.params.about,
      id: route.params.id,
    });
  };

  return (
    <>
      <ScrollView>

        <AboutFtruck route={route} />
        <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="back" color="black" size={27} />
        <Text style={{ fontSize: 20, textAlign: "center", color:"black" }}>GoBack</Text>
      </TouchableOpacity>
        <>
          <View style={{ marginTop: 15 }}>
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: "2%" }}
              onPress={ForLocation}
            >
              <Ionicons color="red" name="location-sharp" size={24} />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "green",
                  fontSize: 20,
                }}
              >
                Click For Location
                Click For Location
              </Text>
              {usertype === "business" ? (
                <View style={styles.container}>
                  <Text>Online</Text>
                  <Switch
                    trackColor={{ false: "red", true: "green" }}
                    thumbColor={isOnline ? "lightgreen" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={updateOnline}
                    value={isOnline}
                  />
                </View>
              ) : (
                ""
              )}
            </TouchableOpacity>
          </View>
        </>

        <Divider width={1.8} style={{ marginVertical: 10 }} />
        <View style={{ alignItems: "center" }}>
          {/*    <View style={{ width: "100%", height: 400, padding: 10 }}>
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
                    <Text>distance: {distance.toFixed(2)} km - time: {duration.toFixed(0)} mins</Text>
                </View>
              </MapView>
            ) : (
              <></>
            )}
            </View> */}
          <>
            {usertype === "business" ? (
              <Button
                Press={AddFoodItems}
                bgColor="red"
                btnLabel="Add food Item"
                textColor="white"
              />
            ) : (
              ""
            )}
          </>
        </View>
        <Fmenuitems restaurantName={route.params.name} foods={foods} />
      </ScrollView>
      <ViewCart navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -15,
    marginLeft: "9%",
  },
});
