import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardField, StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "../../firebase";

const Advertpay = ({ navigation, route }) => {
  const API_URL = "https://foodport-backend-v1.vercel.app/"
  const [cardDetails, setCardDetails] = useState();
  const [loadingx, setLoading] = useState(false);
  const { confirmPayment, loading } = useConfirmPayment();
  const [payment, setPayment] = useState({});
  const [account, setAccount] = useState({});
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    (async () =>
      await AsyncStorage.getItem("email").then((value) => {
        if (value) {
          firebase
            .firestore()
            .collection("userid")
            .where("email", "==", JSON.parse(value).toLowerCase())
            .onSnapshot((snapshot) => {
              snapshot.docs.map((doc) => {
                setAccount({
                  ...doc.data(),
                  uid: doc.id
                });
              });
            });
        }
      }))();
  }, []);

  const fetchPaymentIntentCS = async () => {
    const body = {
      name: account.name,
      email: account.email,
      amount: route.params.amount_due
    }

    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    const { clientSecret, customer, error } = await response.json();

    setCustomer(customer);
    return { clientSecret, customer, error };
  };

  const handlePayMethod = async () => {
    // gather data
    if (!cardDetails?.complete) {
      Alert.alert("Please enter compelte card details");

      return;
    }
    // fetch intent
    try {
      const { clientSecret, customer, error } = await fetchPaymentIntentCS();

      if (error) {
        console.log("failed to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(
          clientSecret, {
          paymentMethodType: "Card",
          billingDetails: { 'email': account.email }
        }
        );

        if (error) {
          Alert.alert(`payment confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          setPayment(paymentIntent);

          let existingCustomer = await firebase.firestore().collection('stripecustomers')
            .where('stripeCustomerId', '==', customer.id).get();

          if (!existingCustomer.docs.length) {
            await firebase.firestore().collection('stripecustomers')
              .add({
                stripeCustomerId: customer.id,
                userEmail: account.email,
                userName: account.name,
                userId: account.uid
              })
          }

          await firebase.firestore().collection("advertpackage").doc(route.params.id).update({
            approved: 'paid',
            active: true
          });

          addOrderToFireBase();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addOrderToFireBase = async () => {
    setLoading(true);
    await firebase.firestore().collection('adpayments').add({
      stripeCustomerId: customer.id,
      userEmail: account.email,
      userName: account.name,
      userId: account.uid,
      paymentIntentId: payment.id,
      amount: payment.amount / 100,
      packageId: route.params.packageId
    })

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Advertpay");
    }, 2500);
  };


  return (
    <StripeProvider publishableKey="pk_test_51KosFhFwyx0lKIchgvLaUYUDAmEOWLSGiJhMIy49eedrJxAwbS1CAvF8KEN7l7mXMJFeeoS2ZUEmtU3eJVYDeTtS00HY1Dbdzx">
      <SafeAreaView>
        <View>
          <Text style={{ textAlign: "center" }}>Pay For the Package</Text>
          <CardField
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
              setCardDetails(cardDetails)
            }}
          />

          <TouchableOpacity style={styles.button} onPress={handlePayMethod}>
            <Text style={styles.buttonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </StripeProvider>
  )
}

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

export default Advertpay;