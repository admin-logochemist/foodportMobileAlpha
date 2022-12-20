import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import firebase from "../firebase";

export default function Foodtruck() {

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


 
  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("orders")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data());
        });
      });


    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Foodtruck</Text>
    </View>
  )
}