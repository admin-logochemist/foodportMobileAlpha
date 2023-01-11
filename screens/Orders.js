import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Orders() {

  const [order, setOrder] = useState("");
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState('');


console.log(items, "fsddggdgd")

  const getData = () => {
    try {
        AsyncStorage.getItem("email")
        .then(value => {
            if (value != null) {
                setEmail(JSON.parse(value))
            }
        })
    } catch (error){
        console.log(error);
    }
}

let tempdata =[];
let zemitems = [];
useEffect(() => {
  getData();
  let firebaseCollection = firebase.firestore().collection("orders").where("email", "==", "hamburger@gmail.com")
  firebaseCollection.onSnapshot(snapshot => {
          snapshot.docs.map(doc => {
          tempdata.push(doc.data())
          zemitems.push(doc.data().items)
          // console.log(doc.data().items, "dsfsdfgfdsg")
        })
        setOrder(tempdata);
        setItems(zemitems);
      })
    }, [email])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <View style={{ 
        height: 200,
        }}>
      <Image
        style={{ height: 250, width:"60%", alignSelf: "center", marginTop: -30 }}
        source={require("../assets/orders/dfdsfd.gif")}
        autoPlay
        speed={0.5}
        loop={false}
      />
      </View>
    <View
      style={{
        margin: 12,
        alignItems: "center",
        height: "100%",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
       Your orders are here
      </Text>
      <ScrollView>
      {order?order.map((data, index) => 
        <>
      <Text>{data.email}</Text>
      <View key={index} style={{ width: 210, marginLeft: 130, marginTop: 10, justifyContent: "space-evenly" }}>
      <Text style={styles.titleStyle}>{data.restaurantName}</Text>
      <Text>my description</Text>
      <Text>123</Text>
    </View>
    <View>
    <Image
      source={require("../assets/orders/dfdsfd.gif")}
      style={{
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: -70,
      }}
    />
    </View>
    </>
   ):""}
      </ScrollView>
    </View>
  </SafeAreaView>
  )
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
