import { View, Text, SafeAreaView, ScrollView, Image,  StyleSheet } from "react-native";
import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import Loader from '../../components/foodtruck/Loader.js';
import Input from '../../components/foodtruck/Input.js';
import Button from '../../components/foodtruck/Button.js';
import RNPickerSelect from 'react-native-picker-select';


export default function AddFoodtruck({navigation}) {

  const [loading, setLoading] = useState(false);
  
  const [resName, setResName] = useState("");
  const [address, setAddress] = useState("");
  const [cusine, setCusine] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  const [type, setType] = useState("");
  const [montime, setMontime] = useState("");
  const [tuetime, setTuetime] = useState("");
  const [Wedtime, setWedTime] = useState("");
  const [Thurtime, setThurTime] = useState("");
  const [Fritime, setFriTime] = useState("");
  const [SatTime, setSAtTime] = useState("");
  const [Suntime, setSuntime] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");


  const addFoodtruck = () => {
    firebase.firestore().collection("resturant").add(
      {
        remail: "Test@gmail.com",
        resName: resName,
        address: address,
        cusine: cusine,
        phone: phone,
        profile: profile,
        Trucktype: type,
        montime: montime,
        tuetime: tuetime,
        Wedtime: Wedtime,
        Thurtime: Thurtime,
        Fritime: Fritime,
        SatTime: SatTime,
        Suntime: Suntime,
        About: about,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(docRef => {
          console.log(docRef.id);
          return docRef.set({
        itemid:docRef.id,
        remail: "Test@gmail.com",
        resName: resName,
        address: address,
        cusine: cusine,
        phone: phone,
        profile: profile,
        Trucktype: type,
        montime: montime,
        tuetime: tuetime,
        Wedtime: Wedtime,
        Thurtime: Thurtime,
        Fritime: Fritime,
        SatTime: SatTime,
        Suntime: Suntime,
        About: about,
         // image:image,
         time: firebase.firestore.FieldValue.serverTimestamp(),
          });
        })
        navigation.navigate("BtabNav")
  }

  return (
    <SafeAreaView style={{backgroundColor: "white", flex: 1}}>
    <Loader visible={loading} />
    <ScrollView
      contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
      <Text style={{color: "black", fontSize: 40, fontWeight: 'bold'}}>
        Adding Food Truck
      </Text>
      <Text style={{color: "grey", fontSize: 18, marginVertical: 10}}>
        Enter Your Food Truck Details
      </Text>
      <View style={{marginVertical: 20}}>
        <Input
        value={resName}
          onChangeText={text => setResName(text)}
          placeholder="Enter Food Truck name"
        />
        <Input
        value={address}
        onChangeText={text => setAddress(text)}
          placeholder="Enter your address"
        />
        <Input
        value={cusine}
        onChangeText={text => setCusine(text)}
          placeholder="Dish Name"
        />
        <Input
        value={phone}
        onChangeText={text => setPhone(text)}
          keyboardType="numeric"
          placeholder="Enter your phone number"
        />
        <Input
        value={profile}
        onChangeText={text => setProfile(text)}
          placeholder="Profile"
        />
      
        <RNPickerSelect
        onValueChange={(value) => setType(value)}
        items={[
            { label: 'Moving Food Truck', value: 'Moving Food Truck' },
            { label: 'Static Food Truck', value: 'Static Food Truck' },
        ]}
        style={pickerSelectStyles}
    />
   
        <Input
        value={montime}
        onChangeText={text => setMontime(text)}
          placeholder="Monday Time"
        />
        <Input
        value={tuetime}
        onChangeText={text => setTuetime(text)}
          placeholder="Tuesday Time"
        />
        <Input
        value={Wedtime}
        onChangeText={text => setWedTime(text)}
          placeholder="Wednesday Time"
        />
        <Input
        value={Thurtime}
        onChangeText={text => setThurTime(text)}
          placeholder="Thursday Time"
        />
        <Input
        value={Fritime}
        onChangeText={text => setFriTime(text)}
          placeholder="Friday Time"
        />
        <Input
        value={SatTime}
        onChangeText={text => setSAtTime(text)}
          placeholder="Saturday Time"
        />
        <Input
        value={Suntime}
        onChangeText={text => setSuntime(text)}
        placeholder="Sunday Time"
      />
      <Input
      value={about}
      onChangeText={text => setAbout(text)}
          placeholder="About"
        />


        <View style={{alignItems:"center"}}>
        <Button bgColor="red" btnLabel="Add" textColor="white" Press={() => addFoodtruck()} />
        </View>
        <Text
          onPress={() => navigation.navigate('FoodTruck')}
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