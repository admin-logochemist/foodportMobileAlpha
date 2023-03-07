import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Advertizement from "../components/Advertizement/Advertchunck.js";
import AntDesign from "react-native-vector-icons/AntDesign";


export default function Orders({ navigation }) {
  const [order, setOrder] = useState([]);
  const [email, setEmail] = useState("");

  const getData = () => {
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

  let tempdata = [];
  useEffect(() => {
    getData();

    let firebaseCollection = firebase
      .firestore()
      .collection("orders")
      .where("email", "==", email);
    firebaseCollection.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        tempdata.push(doc.data());
      });
      setOrder(tempdata);
    });
  }, [email]);

  const setDate = (dtObj) => {
    return new Date(
      dtObj.seconds * 1000 + dtObj.nanoseconds / 1000000
    ).toString();
  };

  return (
    <ScrollView>
      <View
        style={{
          height: 250,
        }}
      >
     
        <Image
          style={{ height: 250, width: "100%", alignSelf: "center" }}
          source={require("../assets/orders/Group_128.png")}
          autoPlay
          speed={1.5}
          loop={false}
        />
      </View>
      <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="back" color="black" size={27} />
      <Text style={{ fontSize: 20, textAlign: "center", color:"black" }}>GoBack</Text>
    </TouchableOpacity>
      <Advertizement />

      <View
        style={{
          // margin: 12,
          alignItems: "center",
          height: "100%",
        }}
      >
     
        {order.map((_eachOrder, orderKey) => (
          <>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                backgroundColor: "red",
                width: "100%",
                textAlign: "center",
                color: "white",
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {setDate(_eachOrder.createdAt).substring(0, 25)}
            </Text>
            {_eachOrder.items.map((_eachItem, itemKey) => (
              <>
                <View
                  key={itemKey}
                  style={{
                    width: 210,
                    marginLeft: 130,
                    marginTop: 10,
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={styles.titleStyle}>
                    {_eachItem.restaurantName}
                  </Text>
                  <Text>{_eachItem.description}</Text>
                  <Text>{_eachItem.price}$</Text>
                </View>
                <View>
                  <Image
                    source={{ uri: _eachItem.image }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 8,
                      marginTop: -70,
                      marginRight: 230,
                    }}
                  />
                </View>
              </>
            ))}
          </>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },

  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});
