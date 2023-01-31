import React from 'react'
import { View, Text } from 'react-native'
import { CardField, useStripe } from "@stripe/stripe-react-native";

const Stripe = () => {
  // const { confirmPayment } = useStripe();

    return ( 
        <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 70,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />
    )
}

export default Stripe
