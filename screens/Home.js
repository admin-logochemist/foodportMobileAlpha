import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import HeaderTabs from '../components/home/HeaderTabs';
import SearchBar from '../components/home/SearchBar';
import Categories from '../components/home/Categories';
import { Divider } from "react-native-elements";
import RestaurantItems, {
  localRestaurants,
} from "../components/home/RestaurantItems";
import BottomTabs from '../components/home/BottomTabs';
// import BtabNav from '../BtabNav';




const YELP_API_KEY = 
"UH0b5_Rg0sAsm0MhK1j2RrnbN50AYdl1mtHyVIH6bAXSMVt6nW8Diwq-ezlmTzP4mVs6qc57fex3nG-72oBlmQq8y0xF92MMDEzzCjHKbJGcXERAl1ClaI04reWIY3Yx"


export default function  Home({ navigation }) {
  const [restaurantData, setRestaurantData] = React.useState(localRestaurants)
  
  // console.log(restaurantData);
  const [city , setCity]= useState("San Francisco");

  const [activeTab , setActiveTab]= useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = 
    `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

// console.log(restaurantData);

  const apiOptions = {
    headers : {
      Authorization: `Bearer ${YELP_API_KEY}`,
    }}

    return fetch(yelpUrl, apiOptions)
    .then((res) => res.json())
    .then(json => 
      setRestaurantData(
      json.businesses.filter((business) => 
      business.transactions.includes(activeTab.toLowerCase())
      ))
      );
  };

  // const getMenuItemsFromYelp = () => {
  //   fetch(`https://api.yelp.com/v3/businesses/${'LPoRD0huneBqPZbg1wsJ_Q'}`, {
  //     headers: {
  //       Authorization: `Bearer ${YELP_API_KEY}`,
  //     },
  //   })
  //   .then((res) => res.json())
  //   .then(data => console.log(data.categories))
  // }


  useEffect(() => {
    getRestaurantsFromYelp();
    // getMenuItemsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
    <View style={{ backgroundColor: "white", padding: 15 }}>
      <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <SearchBar cityHandler={setCity} />
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Categories />
      <RestaurantItems
        restaurantData={restaurantData}
        navigation={navigation}
      />
    </ScrollView>
    <Divider width={10} color={'red'} />
  {/*  <BottomTabs /> 
    <BtabNav />*/}
  </SafeAreaView>
  )
}