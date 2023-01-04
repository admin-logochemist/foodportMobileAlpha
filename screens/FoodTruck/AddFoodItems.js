import { View, Text, SafeAreaView, ScrollView, Image,  StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from 'react'
import firebase, { doc }  from 'firebase/compat/app';
import Loader from '../../components/foodtruck/Loader.js';
import Input from '../../components/foodtruck/Input.js';
import Button from '../../components/foodtruck/Button.js';
import RNPickerSelect from 'react-native-picker-select';


export default function AddFoodItems(props) {

    const [loading, setLoading] = useState(false);

    const { name, id, remail } =
    props.route.params;

   const resname = name;

    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
   

    const addFoodtruckItems = async () => {
       firebase.firestore().collection("foodtest").add(
          {
            // accid: accid,
            category: category,
            description: description,
            id: id,
            image: "image",
            price: price,
            remail: remail,
            resname: resname,
            restid: id,
            title: title,
            type: type,
            remail:remail,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            }).then(docRef => {
              console.log(docRef.id);
              return docRef.set({
                itemid: docRef.id,
                category: category,
                description: description,
                id: id,
                image: "image",
                price: price,
                remail: remail,
                resname: resname,
                restid: id,
                title: title,
                type: type,
                remail:remail,
                time: firebase.firestore.FieldValue.serverTimestamp(),
              });
            })
            
            props.navigation.navigate("BtabNav")
      }


  return (
    <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
    <Loader visible={loading} />
    <ScrollView
      contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
      <Text style={{color: "black", fontSize: 40, fontWeight: 'bold'}}>
        Adding Food Truck Items
      </Text>
      <Text style={{color: "grey", fontSize: 18, marginVertical: 10}}>
        Enter Your Food Item Details
      </Text>
      <View style={{marginVertical: 20}}>
        <Input
        value={category}
          onChangeText={text => setCategory(text)}
          placeholder="Enter Food category name"
        />
    
        <RNPickerSelect
        onValueChange={(value) => setType(value)}
        items={[
            { label: 'Dinner', value: 'Dinner' },
            { label: 'Lunch', value: 'Lunch' },
            { label: 'Breakfast', value: 'Breakfast' },

        ]}
        style={pickerSelectStyles}
    />
    <Input
    value={title}
      onChangeText={text => setTitle(text)}
      placeholder="Enter Your Food Title"
    />
    <Input
    value={price}
    onChangeText={text => setPrice(text)}
      keyboardType="numeric"
      placeholder="Enter your Item Price"
    />
    <TextInput
    multiline={true}
    numberOfLines={4}
    value={description}
    onChangeText={text => setDescription(text)}
    style={{
        borderRadius: 10,
         color: "black",
     paddingHorizontal: 10,
      width: '100%',
     backgroundColor: 'rgb(220,220, 220)',
      marginVertical: 10,
      paddingVertical: 16,
      height: 100,
    justifyContent: "flex-start"
    }} 
    placeholderTextColor = "black" 
    placeholder="Enter Your Item Description Here">
    </TextInput>

        <View style={{alignItems:"center"}}>
        <Button bgColor="red" btnLabel="Add" textColor="white" Press={() => addFoodtruckItems()} />
        </View>
        <Text
          onPress={() => props.navigation.navigate('FoodTruck')}
          style={{
            color: "black",
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 16,
          }}>
          Go Back
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 20,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
  });