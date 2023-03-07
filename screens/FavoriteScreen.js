import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function FavoriteScreen({ navigation, ...props }) {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    (async () =>
      await AsyncStorage.getItem("email").then((value) => {
        if (value) {
          firebase
            .firestore()
            .collection("favoritealpha")
            .where("userEmail", "==", JSON.parse(value).toLowerCase())
            .onSnapshot((snapshot) => {
              let _tempData = [];

              snapshot.docs.map((doc) => {
                _tempData.push(doc.data());
              });

              setFavourites(_tempData);
            });
        }
      }))();
  }, []);

  return (
    <View>
      <ScrollView>
      <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="back" size={27} />
      <Text style={{ fontSize: 20, textAlign: "center" }}>GoBack</Text>
    </TouchableOpacity>
        <View
          style={{
            // margin: 15,
            alignItems: "center",
            height: "100%",
            backgroundColor: "#F5F0ED",
            marginBottom: 10,
            marginTop: 10,
            padding: 10,
          }}
        >
          {favourites !== undefined &&
          favourites !== null &&
          favourites !== "" &&
          favourites.length > 0 ? (
            favourites.map((items) => (
              <>
                <TouchableOpacity
                  key={items?.itemid}
                  activeOpacity={1}
                  style={{ marginBottom: 30 }}
                  onPress={() =>
                    navigation.navigate("FoodtruckDetail", {
                      name: items.resName,
                      address: items.address,
                      cusine: items.cusine,
                      phone: items.phone,
                      image: items.image,
                      about: items.About,
                      id: items.itemid,
                      remail: items.remail,
                    })
                  }
                >
                  <View style={styles.card}>
                    <Image
                      style={{
                        height: 200,
                        width: "100%",
                        alignSelf: "center",
                        borderRadius: 10,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      source={{ uri: items?.image }}
                      autoPlay
                      speed={0.5}
                      loop={false}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        {items?.resName.substring(0, 20)}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "blue",
                          borderRadius: 15,
                          padding: 6,
                          marginLeft: 16,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 13,
                            textAlign: "center",
                          }}
                        >
                          {items?.Trucktype}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            ))
          ) : (
            <Text>You Have No Food Trucks</Text>
          )}

          <Divider width={10} color={"red"} />
        </View>
      </ScrollView>
    </View>
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
