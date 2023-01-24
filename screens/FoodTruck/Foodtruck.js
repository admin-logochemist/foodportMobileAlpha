import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import getFoodTruck from "../../apis/Foodtruckapi.js";
import firebase from '../../firebase.js';
import { Tooltip, Badge, Divider } from "react-native-elements";
import Button from "../../components/foodtruck/Button.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import SearchBar from '../../components/foodtruck/SearchBar.js'

export default function Foodtruck({ navigation, ...props}) {

 

  const [foodtruck, setFoodTruck] = useState([]);
  const [email, setEmail] = useState('');
  const [usertype, setUserType] = useState('');

  const [loc, setLoc] = useState();
  const [myloc, setMyLoc] = useState("US");
  const [city , setCity]= useState("San Francisco");
 

  const [search, setSearch] = useState('');
 

  const getSearchValue = (searchFieldValue) => {
    setSearch(searchFieldValue)
  // console.log(search);
  // console.log(foodtruck[1].resName);
 }
  
  const GetGeoLoc =  (location) => {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.coords.latitude + ',' + location.coords.longitude + '&key=AIzaSyB5KZy-WiNvS_l7AjO-lV-eNdSaPBVLuyg';

    return fetch(url)
    .then((res) => res.json())
    .then(json => 
        setMyLoc(json['plus_code']['compound_code'])
      );
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }
    try {

      const subscription = await Location.watchPositionAsync({}, (location) => {
        // console.log(location);
        setLoc(location);
        GetGeoLoc(location);
        // subscription.remove();
    });

    } catch (error){
        console.log(error);
    }
  }

  const getData = async () => {

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
    try {
      AsyncStorage.getItem("userType")
      .then(valuez => {
          if (valuez != null) {
              setUserType(JSON.parse(valuez))
          }
      })
    } catch (error){
      console.log(error);
    }
}

 const AddFoodScreen =  () => {

  navigation.navigate('AddFoodTruck')
  // alert("We are goin here to the next page of navigation add  food truck");
 }

 var tempdata = []
 
useEffect(() => {
  getLocation();
  getData();
  let firebaseCollection = firebase.firestore().collection("resturant")
    
  if (usertype === "business") { 
      firebaseCollection = firebaseCollection.where("remail", "==" , email)
     
  } 

  firebaseCollection.onSnapshot(snapshot => {
          snapshot.docs.map(doc => {
          tempdata.push({...doc.data()})

      })
      setFoodTruck(tempdata);
      })
}, [usertype])

  return (
   
    <View>
    <View style={{ alignItems:"center",  backgroundColor: "#C0C0C0"}}>
    <Text style={{fontSize:14, marginTop:50, fontWeight:"bold", color:"black" }}>{myloc}</Text>
    <SearchBar getSearchValue={getSearchValue} />
    <>
    {(usertype == "business") ?
      <Button
    Press={AddFoodScreen}
    bgColor="red"
    btnLabel="Add food Truck"
    textColor= "white"
  />
:""}
</>
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
      padding:10,
    }}
  >
  {foodtruck!==undefined&&foodtruck!==null&&foodtruck!==''&&foodtruck.length>0?foodtruck
  .filter((item) =>
  item.resName.toLowerCase().includes(search.toLowerCase())
)
  .map((items)=> 
    <>
    <TouchableOpacity 
    key={items?.itemid}
        activeOpacity={1}
        style={{marginBottom: 30}}
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
    <View style={styles.card}>
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
    <Text style={{ color:"black", fontWeight:"bold", fontSize:18, textAlign:"center" }}>{items?.resName.substring(0 ,20)}</Text>
    <View style={{backgroundColor:"blue", borderRadius:15, padding: 6, marginLeft:16 }}>
    <Text style={{ color:"white", fontWeight:"bold", fontSize:13, textAlign:"center" }}>{items?.Trucktype}</Text>
    </View>
    </View>
    </View>
   
    </TouchableOpacity>
    </>
    ):
    <Text>You Have No Food Trucks</Text>
  }


    <Divider width={10} color={'red'} />
  </View>
  </ScrollView>

    </View>

  )
}

const styles = StyleSheet.create({
  card: {
    alignItems:"center",
     width:350,
     backgroundColor:"white",
      padding:10,
        borderRadius:10,
         marginBottom: 10,
         shadowColor: "black",
         shadowOffset: {
           width: 0,
           height: 2,
       },
       shadowOpacity: 0.75,
       shadowRadius: 5.84,
       
       elevation: 5,
  },

});
  