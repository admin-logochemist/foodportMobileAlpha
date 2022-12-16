import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";

export default function Cart() {

    const [lastOrder, setLastOrder] = useState({
        items: [
          {
            title: "Bologna",
            description: "With butter lettuce, tomato and sauce bechamel",
            price: "$13.50",
            image:
              "https://www.modernhoney.com/wp-content/uploads/2019/08/Classic-Lasagna-14-scaled.jpg",
          },
        ],
      });
    
    const { items, restaurantName } = useSelector(
        (state) => state.cartReducer.selectedItems
      );
    
      const total = items
        .map((item) => Number(item.price.replace("$", "")))
        .reduce((prev, curr) => prev + curr, 0);
    
      const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
      });
     
      useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db
          .collection("orders")
          .orderBy("createdAt", "desc")
          .limit(1)
          .onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
              setLastOrder(doc.data());
            });
          });
    
        return () => unsubscribe();
      }, []);
    

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <View
      style={{
        margin: 15,
        alignItems: "center",
        height: "100%",
      }}
    >
     <Image style={{ height: 400, alignSelf: "center", marginBottom: 10 }}
     source={require("../assets/cart/71390-shopping-cart-loader.gif")}/>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
       Your Cart Items
      </Text>
      <ScrollView>
        <MenuItems
          foods={lastOrder.items}
          hideCheckbox={true}
          marginLeft={10}
        />
      </ScrollView>
    </View>
  </SafeAreaView>

  )
}