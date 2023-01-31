import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import StripeField from '../components/Stripe/Stripe.js'

const StripeCard = ({ navigation, route }) => {
  const { items, restaurantName, email, createdAt } = route.params;
  const [loading, setLoading] = useState(false);


  const addOrderToFireBase = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("orders")
      .add({
        items: route.params.items,
        restaurantName: route.params.restaurantName,
        email: route.params.email,
        createdAt: route.params.createdAt,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigation.navigate("OrderCompleted");
        }, 2500);
      });
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Image
        source={require("../assets/logo/logo.png")}
        style={{
          height: 90,
          width: "100%",
          marginBottom: 20,
        }}
      />

      <StripeField />

      <TouchableOpacity style={styles.button} onPress={addOrderToFireBase}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 28,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default StripeCard;
