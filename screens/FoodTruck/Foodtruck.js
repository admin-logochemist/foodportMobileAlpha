import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from "react";
import getFoodTruck from "../../apis/Foodtruckapi.js";
import firebase from '../../firebase.js';
import { Tooltip, Badge, Divider } from "react-native-elements";
import Button from "../../components/foodtruck/Button.js"


export default function Foodtruck({ navigation, ...props}) {

  const [foodtruck, setFoodTruck] = useState([]);

 const AddFoodScreen =  () => {

  navigation.navigate('AddFoodTruck')
  // alert("We are goin here to the next page of navigation add  food truck");
 }


var tempdata = []
useEffect((isAdmin = true) => {
  let firebaseCollection = firebase.firestore().collection("resturant")
    
  if (isAdmin) { 
      firebaseCollection = firebaseCollection.where("remail", "==", "hamburger@gmail.com")
  } 
  
  firebaseCollection.onSnapshot(snapshot => {
          snapshot.docs.map(doc => {
          tempdata.push({...doc.data()})
      })
      setFoodTruck(tempdata);
      })
}, [])

  return (
    <View>
    <View style={{ alignItems:"center" }}>
    <Button
    Press={AddFoodScreen}
    bgColor="red"
    btnLabel="Add food Truck"
    textColor= "white"
  />
  </View>
  <ScrollView>
  <View
    style={{
      // margin: 15,
      alignItems: "center",
      height: "100%",
      backgroundColor:"#F5F0ED",
      marginBottom:10,
      marginTop:10,
      padding:10
    }}
  >
  {foodtruck!==undefined&&foodtruck!==null&&foodtruck!==''&&foodtruck.length>0?foodtruck.map((items)=> 
    <>
    <TouchableOpacity 
    key={items?.itemid}
        activeOpacity={1}
        style={{ marginBottom: 30 }}
        onPress={() =>
          navigation.navigate("FoodtruckDetail", {
            name: items.resName,
            address: items.address,
            cusine: items.cusine,
            phone: items.phone,
            image: items.image,
            about: items.About,
            id: items.itemid,
            remail: items.remail,
          })
        }
    >
    <View style={{alignItems:"center", width:350, backgroundColor:"white", padding:10, borderRadius:10, marginBottom: 10 }}>
    <Image
      style={{ height: 200, width:"100%", alignSelf: "center", borderRadius: 10, marginTop: 10, marginBottom: 10 }}
      source={{ uri: items?.image }}
      autoPlay
      speed={0.5}
      loop={false}
      />
    <View  style={{
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "space-between",
    }}>
    <Text style={{ color:"black", fontWeight:"bold", fontSize:18, textAlign:"center" }}>{items?.resName}</Text>
    <View style={{backgroundColor:"blue", borderRadius:15, padding: 6, marginLeft:16 }}>
    <Text style={{ color:"white", fontWeight:"bold", fontSize:13, textAlign:"center" }}>{items?.Trucktype}</Text>
    </View>
    </View>
    </View>
   
    </TouchableOpacity>
    </>
    ):""
  }


    <Divider width={10} color={'red'} />
  </View>
  </ScrollView>

    </View>

  )
}
  