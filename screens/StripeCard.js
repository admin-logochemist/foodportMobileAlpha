import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { CardField, useStripe } from '@stripe/stripe-react-native';


const StripeCard = ({navigation, route}) => {

  const {  items, restaurantName, email, createdAt } = route.params;
  const [loading, setLoading] = useState(false);

    const { confirmPayment } = useStripe();

      const addOrderToFireBase = () => {
    setLoading(true);
    const db = firebase.firestore();
    db.collection("orders")
      .add({
        items: route.params.items,
        restaurantName: route.params.restaurantName,
        email: route.params.email,
        createdAt: route.params.createdAt
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
          navigation.navigate("OrderCompleted");
        }, 2500);
      });
  };

  return (
    <View style={{marginTop:50}}>
    <Image source={require("../assets/logo/logo.png")} style={{
      height: 90,
      width: "100%",
      marginBottom:20,
      
   }}/>
     <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 70,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
    <TouchableOpacity style={styles.button} 
    onPress={addOrderToFireBase}
    >
    <Text style={styles.buttonText}>Checkout</Text>
  </TouchableOpacity>
    </View>
    
  )
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 28,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20,
  },
});

export default StripeCard;