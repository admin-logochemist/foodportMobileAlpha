import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { CardField, useConfirmPayment, StripeProvider } from "@stripe/stripe-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";

const StripeCard = ({ navigation, route }) => {
  const { items, restaurantName, email, createdAt } = route.params;
  const [loadingx, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState();
  const {confirmPayment, loading} = useConfirmPayment();
  const [account, setAccount] = useState({});
  const [payment, setPayment] = useState({});
  const [customer, setCustomer] = useState({});
  const API_URL = "https://foodport-backend-v1.vercel.app/"
  const total = items
    .map((item) => Number(item.price.replace("$", "")))
    .reduce((prev, curr) => prev + curr, 0);

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
        amount: total
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
                    billingDetails: {'email': 'kdanial9@gmail.com'}
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

                addOrderToFireBase();
            }
        }
    } catch (error) {
        console.log(error);
    }
    // confirm payment


  };

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
      .then(async (docRef) => {
        await firebase.firestore().collection('orderpayments').add({
            stripeCustomerId: customer.id,
            userEmail: account.email,
            userName: account.name,
            userId: account.uid,
            paymentIntentId: payment.id,
            amount: payment.amount / 100,
            orderId: docRef.id
        })

        setTimeout(() => {
          setLoading(false);
          navigation.navigate("OrderCompleted");
        }, 2500);
      });
  };

  return (
  <>
  <SafeAreaView>
  <View>
  <TouchableOpacity
  style={{ flexDirection: "row" }}
  onPress={() => navigation.goBack()}
>
  <AntDesign name="back" size={27} />
  <Text style={{ fontSize: 20, textAlign: "center" }}>GoBack</Text>
</TouchableOpacity>
  </View>
  
    <StripeProvider publishableKey="pk_test_51KosFhFwyx0lKIchgvLaUYUDAmEOWLSGiJhMIy49eedrJxAwbS1CAvF8KEN7l7mXMJFeeoS2ZUEmtU3eJVYDeTtS00HY1Dbdzx">
        <View style={{ marginTop: 50 }}>
        <Image
            source={require("../assets/logo/logo.png")}
            style={{
            height: 90,
            width: "100%",
            marginBottom: 20,
            }}
        />

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
    </StripeProvider>
    </SafeAreaView>
    </>
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
