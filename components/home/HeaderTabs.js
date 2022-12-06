import { View, Text, SafeAreaView , TouchableOpacity} from 'react-native';
import React , { useState } from 'react';

export default function HeaderTabs(props) {

    const [activeTab , setActiveTab] = useState("Delivery");

  return (
    <View style={{ flexDirection: "row" , alignSelf: "center" }}>
     <HeaderButton 
      text="Delivery"
      btnColor="black" 
      textColor="white" 
      activeTab={props.activeTab} 
      setActiveTab={props.setActiveTab} 
      />
     
     <HeaderButton
      text="Pickup" 
      btnColor="white"
      textColor="black"
      activeTab={props.activeTab} 
      setActiveTab={props.setActiveTab}  />

     <HeaderButton 
     text="FoodTruck" 
     btnColor="black" 
     textColor="white" 
     activeTab={activeTab} 
     setActiveTab={setActiveTab} 
     />

    </View>
  )
}


const HeaderButton = (props) => (

  <TouchableOpacity
  style={{
    backgroundColor: props.activeTab === props.text ? "red" : "white",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
  }}
  onPress={() => props.setActiveTab(props.text)}
>
  <Text
    style={{
      color: props.activeTab === props.text ? "white" : "black",
      fontSize: 15,
      fontWeight: "900",
    }}
  >
    {props.text}
  </Text>
</TouchableOpacity>
 );