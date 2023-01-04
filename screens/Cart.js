import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
// import firebase from "../firebase";
import MenuItems from "../components/restaurantDetail/MenuItems";
import { cartReducer } from "../redux/reducers/cartReducer";
import { Divider } from "react-native-elements";


function Cart(props) {

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  // console.log(items.length ,"Alpha Items")
   

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <Image
    style={{ height: 160, width:"60%", alignSelf: "center", marginTop: -30 }}
    source={require("../assets/cart/79800-add-to-cart.gif")}
    autoPlay
    speed={0.5}
    loop={false}
  />
  <Divider width={10} color={'red'} />
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

    {items!==undefined&&items!==null&&items!==''&&items.length>0?items.map(data=>
      <>
      <Image
      style={{ height: 200, width:"100%", alignSelf: "center", borderRadius: 10, marginTop: 10 }}
      source={{ uri: data?.image }}
      autoPlay
      speed={0.5}
      loop={false}
      />
      <View style={{ alignItems:"center", width:"100%" }}>
      <Text style={{ color:"red", fontWeight:"bold", fontSize:18, width:"100%", textAlign:"center" }}>{data?.restaurantName}</Text>
      <Text style={{ color:"green", fontWeight:"bold", fontSize:25, textAlign:"center" }}>{data?.title}</Text>
      <Text style={{ color:"black", fontSize:17,fontWeight:"bold", alignItems:"center", textAlign:"center" }}>{data?.description}</Text>
      <Text style={{ color:"black", fontWeight:"bold", fontSize:15, textAlign:"center" }}>Price</Text>
      <Text style={{ color:"black", fontWeight:"bold", fontSize:20, textAlign:"center" }}>{data?.price}</Text>
      </View>
      </>
      ):
     <Text style={{fontSize:30, fontWeight:"bold", color:"red"}}>Your Cart is Empty</Text>}
      <Divider width={10} color={'red'} />
    </View>
    </ScrollView>
  </SafeAreaView>

  )

}


export default Cart;