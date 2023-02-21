import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react";
import { Divider, Button } from "react-native-elements";
import firebase from "../../firebase.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Myaddslist = ( {navigation} ) => {

const [advert, setAdvert] = useState('');
const [email, setEmail] = useState("");

console.log(advert, 'i am here=====================================');

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
}


var tempdata = [];
  useEffect(() => {
    getData();
    let firebaseCollection = 
    firebase.firestore().collection("advertpackage")
    .where("uEmail", "==", email);
    firebaseCollection.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        tempdata.push({ ...doc.data() });
      });
      setAdvert(tempdata);
    // console.log('heldfsdfsdfs');
    });
  }, [email]);



    const checkoutadvert = () => {
        // console.log("my next screen")
      navigation.navigate("Advertpay")

    }


  return (
    <SafeAreaView>

    <View style={{backgroundColor:"#DCDCDC", padding:10 }}>
      <Text style={{color:"red" , fontSize:20, fontWeight:"bold", textAlign:"center" }}>Your Advertizement List</Text>
    </View>

    <ScrollView>

    {
        advert && advert?.length>0 ? 
         advert.map((ad, index) => 
            <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
        
              <View style={{alignItems:"center"}}>
              <Text style={styles.title}>{ad?.name}</Text>
              </View>
        
              <View style={styles.containerText}>
              <Text style={styles.description}>Date</Text>
              <Text style={styles.description}>{ad?.packageDateStart}</Text>
              </View>
        
              <View style={styles.containerText}>
              <Text style={styles.description}>Price</Text>
              <Text style={styles.description}>19$</Text>
              </View>
        
              <View style={styles.containerText}>
              <Text style={styles.description}>Status</Text>
              <Text style={styles.description}>{ad?.approved}</Text>
              </View>
        
              <View style={styles.container}>
              <Button title="Delete" buttonStyle={styles.button} />
              <Button title="Pay" buttonStyle={styles.buttonpay} onPress={checkoutadvert} />
            </View>
            </View>
          </View>
         )
        : ""
    }

    </ScrollView>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      elevation: 3,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#333',
      shadowOpacity: 0.3,
      shadowRadius: 2,
      marginHorizontal: 4,
      marginVertical: 6,
    },
    cardContent: {
      marginHorizontal: 18,
      marginVertical: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    description: { 
      marginTop: 8,
      fontSize: 16,
      color: '#666',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      button: {
        margin: 10,
        backgroundColor: 'red',
        borderRadius:10,
      },
      buttonpay: {
        margin: 10,
        backgroundColor: 'green',
        borderRadius:10,
        width:70
      },
  });

export default Myaddslist;