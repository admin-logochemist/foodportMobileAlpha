import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

import { ImageSlider } from "react-native-image-slider-banner";



const advertchunck = () => {
  return (
    <View>
  <Text style={styles.text}>Your Advertizment Start</Text>
      <ImageSlider 
    data={[
        {img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5a5uCP-n4teeW2SApcIqUrcQApev8ZVCJkA&usqp=CAU'},
        {img: 'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg'},
        {img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg'}
    ]}
    autoPlay={false}
    onItemChanged={(item) => console.log("item", item)}
    closeIconColor="#fff"
/>
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 78,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default advertchunck;
