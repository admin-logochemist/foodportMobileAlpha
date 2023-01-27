import { View, Text, SafeAreaView, ScrollView, ImageBackground } from 'react-native'
import React, { useState } from 'react';
import { Divider, Tab, TabView, PricingCard, lightColors, FAB } from "react-native-elements";

export default function Advertize({navigation}) {
    const [index, setIndex] = React.useState(0);

  return (
      <>
    <Tab
      value={index}
      onChange={(e) => setIndex(e)}
      indicatorStyle={{
        backgroundColor: 'red',
        height: 6,
      }}
      variant="secondary"
    >
      <Tab.Item
        title="Bronze"
        titleStyle={{ fontSize: 16 }}
        icon={{ name: 'timer', type: 'ionicon', color: 'red' }}
      />
      <Tab.Item
        title="Gold"
        titleStyle={{ fontSize: 16 }}
        icon={{ name: 'heart', type: 'ionicon', color: 'red' }}
      />
      <Tab.Item
        title="Paltinum"
        titleStyle={{ fontSize: 15 }}
        icon={{ name: 'basket', type: 'ionicon', color: 'red' }}
      />
    </Tab>


    <TabView value={index} onChange={setIndex} animationType="spring">
    <TabView.Item style={{ backgroundColor: 'yellow', width: '100%' }}>
    <ImageBackground source={require("../../assets/advertize/alphaimagezero.gif")} style={{
      height: "100%",
   }}>
  <View style={{
      margin:20,
      backgroundColor: "#F5F5F5",
      height:540,
      alignItems: "center",
      borderRadius:20,
      padding:40,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 3.75,
      shadowRadius: 5.84,
  
      elevation: 5,
      }}>
  <Text style={{ fontSize:30, fontWeight:"bold", color:"red" }}>Bronze Package</Text>
  <Text style={{ fontSize:60, fontWeight:"bold", color:"black", marginTop:20 }}>50$</Text>
  <Text style={{ fontSize:50, fontWeight:"bold", color:"red", marginTop:-30, marginBottom: 30 }}> ______</Text>
 <View style={{textAlign:"center"}}>
  <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    1 Advertizment</Text>
  <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    High Quality Image</Text>
  <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    Survival 15 days</Text>
  <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    Arround 3 Times a day</Text>
  <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    No Replacement!</Text>
  </View>
 <View style={{ marginTop:50,}}>
  <FAB
  onPress={""}
  title="Buy Now"
  upperCase
  color="red"
  icon={{ name: 'timer', color: 'white' }}
/>
</View>
  </View>
  </ImageBackground>
    </TabView.Item>



      <TabView.Item style={{ backgroundColor: 'yellow', width: '100%' }}>
      <ImageBackground source={require("../../assets/advertize/alphaimagezero.gif")} style={{
        height: "100%",
     }}>
    <View style={{
        margin:20,
        backgroundColor: "#F5F5F5",
        height:540,
        alignItems: "center",
        borderRadius:20,
        padding:40,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 3.75,
        shadowRadius: 5.84,
    
        elevation: 5,
        }}>
    <Text style={{ fontSize:30, fontWeight:"bold", color:"red" }}>Bronze Package</Text>
    <Text style={{ fontSize:60, fontWeight:"bold", color:"black", marginTop:20 }}>50$</Text>
    <Text style={{ fontSize:50, fontWeight:"bold", color:"red", marginTop:-30, marginBottom: 30 }}> ______</Text>
   <View style={{textAlign:"center"}}>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    1 Advertizment</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    High Quality Image</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    Survival 15 days</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    Arround 3 Times a day</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    No Replacement!</Text>
    </View>
   <View style={{ marginTop:50,}}>
    <FAB
    onPress={""}
    title="Buy Now"
    upperCase
    color="red"
    icon={{ name: 'timer', color: 'white' }}
  />
  </View>
    </View>
    </ImageBackground>
      </TabView.Item>


      <TabView.Item style={{ backgroundColor: 'yellow', width: '100%' }}>
      <ImageBackground source={require("../../assets/advertize/alphaimagezero.gif")} style={{
        height: "100%",
     }}>
    <View style={{
        margin:20,
        backgroundColor: "#F5F5F5",
        height:540,
        alignItems: "center",
        borderRadius:20,
        padding:40,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 3.75,
        shadowRadius: 5.84,
    
        elevation: 5,
        }}>
    <Text style={{ fontSize:30, fontWeight:"bold", color:"red" }}>Bronze Package</Text>
    <Text style={{ fontSize:60, fontWeight:"bold", color:"black", marginTop:20 }}>50$</Text>
    <Text style={{ fontSize:50, fontWeight:"bold", color:"red", marginTop:-30, marginBottom: 30 }}> ______</Text>
   <View style={{textAlign:"center"}}>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    1 Advertizment</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    High Quality Image</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    Survival 15 days</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    Arround 3 Times a day</Text>
    <Text style={{ fontSize:20, fontWeight:"bold", color:"black", marginTop:10 }}>➤    No Replacement!</Text>
    </View>
   <View style={{ marginTop:50,}}>
    <FAB
    onPress={""}
    title="Buy Now"
    upperCase
    color="red"
    icon={{ name: 'timer', color: 'white' }}
  />
  </View>
    </View>
    </ImageBackground>
      </TabView.Item>



    </TabView>

  </>
  )
}