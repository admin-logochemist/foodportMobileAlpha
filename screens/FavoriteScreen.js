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

export default function FavoriteScreen({ navigation, ...props }) {
  const [favourites, setFavourites] = useState([]);
  const [email, setEmail] = useState("");

  const getData = async () => {
    try {
      AsyncStorage.getItem("email").then((value) => {
        if (value != null) {
          setEmail(JSON.parse(value));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  var tempdata = [];
  useEffect(() => {
    getData();
    let firebaseCollection = firebase
      .firestore()
      .collection("resturant")
      .where("remail", "==", email);

    firebaseCollection.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        tempdata.push({ ...doc.data() });
      });
      setFavourites(tempdata);
    });
  }, []);

  return (
    <View>
      <ScrollView>
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
