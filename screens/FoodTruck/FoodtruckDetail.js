import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Divider } from "react-native-elements";
import AboutFtruck from "../../components/foodtruck/AboutFtruck.js";
import Fmenuitems from "../../components/foodtruck/Fmenuitems.js";
import ViewCart from "../../components/restaurantDetail/ViewCart.js";
import Button from "../../components/foodtruck/Button.js";
import firebase from "../../firebase.js";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";



export default function FoodtruckDetail({ route, navigation }) {
  const [foods, setFood] = useState([]);
  const [usertype, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [lat, setLat] = useState(foods[0]?.latitude || 37.78825);
  const [long, setLong] = useState(foods[0]?.longitude || 37.78825);

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

  const AddFoodItems = () => {
    navigation.navigate("AddFoodItems", {
      name: route.params.name,
      id: route.params.id,
      remail: route.params.remail,
    });
  };

  const ForLocation = () => {
    navigation.navigate("Trucklocation",{
      name: route.params.name,
      lat: lat,
      long: long,
      about:route.params.about,
      id: route.params.id,
    })
  }

  return (
    <>
      <ScrollView>
        <AboutFtruck route={route} />
        <TouchableOpacity 
        onPress={ForLocation}
        ><Text 
        style={{ 
          textAlign: "center",
         fontWeight:"bold",
         marginTop:20,
         color:"green",
         fontSize:20,
         }}>
         Click For Location
         </Text>
         </TouchableOpacity>

        <Divider width={1.8} style={{ marginVertical: 10 }} />
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "100%", height: 400, padding: 10 }}>
            {showMap ? (
              <MapView
                style={{ width: "100%", height: "100%" }}
                initialRegion={{
                  latitude: lat,
                  longitude: long,
                  latitudeDelta: 0.15,
                  longitudeDelta: 0.25,
                }}
              >
                <Marker
                  key={`${new Date().getMilliseconds()}`}
                  coordinate={{
                    latitude: lat,
                    longitude: long,
                  }}
                  title={route.params.name}
                  description={route.params.about}
                />
              </MapView>
            ) : (
              <></>
            )}
          </View>
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
