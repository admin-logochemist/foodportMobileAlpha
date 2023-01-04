import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react';
import { Divider } from "react-native-elements";
import AboutFtruck from '../../components/foodtruck/AboutFtruck.js';
import Fmenuitems from '../../components/foodtruck/Fmenuitems.js';
import ViewCart from '../../components/restaurantDetail/ViewCart.js';
import Button from '../../components/foodtruck/Button.js';
import firebase from '../../firebase.js';

export default function FoodtruckDetail({ route, navigation}) {
    const [foods, setFood] = useState([])
    let tempdata = []

    useEffect(() => {
      firebase.firestore().collection("foodtest").where('id', '==', route.params.id)
      .onSnapshot(snapshot => {
              snapshot.docs.map(doc => {
              tempdata.push(doc.data())
          })
          setFood(tempdata);
          })
    }, [])


      const AddFoodItems =  () => {
        navigation.navigate('AddFoodItems',
        {
          name: route.params.name,
          id: route.params.id,
          remail:route.params.remail,
        })
       }

  return (
    <View>
      <AboutFtruck route={route}/>
      <Divider width={1.8} style={{ marginVertical: 10 }} />
      <View style={{ alignItems:"center" }}>
      <Button
      Press={AddFoodItems} 
      bgColor="red"
      btnLabel="Add food Item"
      textColor= "white" />
      </View>
      <Fmenuitems restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  )
}