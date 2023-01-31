import React, { useState } from "react";
import { View, Text, TextInput, Switch, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import Buttonz from "../components/Editaccounts/Button.js"

export default function Editaccounts({route, navigation}) {
  
  // console.log(route.params.address, "dsddddddddddddddddddddddddddddddddddddddddd");

  
  
  return (
    <SafeAreaView> 
    <View style={{alignItems:"center"}}>
    <Text style={{fontSize:20, fontWeight:"bold"}}>Edit Profile</Text>
    </View>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
      style={styles.input}
      value={route.params.name}
      // onChangeText={(text) => setName(text)}
      />
      
      <Text style={styles.label}>About</Text>
      <TextInput
      style={styles.input}
      value={route.params.about}
      // onChangeText={(text) => setName(text)}
      />
      
      <Text style={styles.label}>Address:</Text>
      <TextInput
      style={styles.input}
      value={route.params.address}
      // onChangeText={(text) => setName(text)}
      />
      
      <Text style={styles.label}>City</Text>
      <TextInput
      style={styles.input}
      value={route.params.city}
      // onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Country</Text>
      <TextInput
      style={styles.input}
      value={route.params.country}
      // onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Currency</Text>
      <TextInput
      style={styles.input}
      value={route.params.currency}
      // onChangeText={(text) => setName(text)}
      />


      <Text style={styles.label}>Password</Text>
      <TextInput
      style={styles.input}
      value={route.params.password}
      // onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
      style={styles.input}
      value={route.params.phone}
      // onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>State</Text>
      <TextInput
      style={styles.input}
      value={route.params.state}
      // onChangeText={(text) => setName(text)}
      />


      <Text style={styles.label}>ZipCode</Text>
      <TextInput
      style={styles.input}
      value={route.params.zipcode}
      // onChangeText={(text) => setName(text)}
      />

      <View style={{ marginTop: 10, marginBottom: 190, alignItems:"center" }}>

      <Buttonz btnLabel="Update" bgColor="red"  textColor="white" />
      <Buttonz btnLabel="Cancel" bgColor="black"  textColor="white" Press={() => navigation.goBack()} />

              </View>
              
              </View>
              </ScrollView>
              </SafeAreaView>
  );
}

const styles = {
  container: {
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 10,
    borderRadius:15,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
};




