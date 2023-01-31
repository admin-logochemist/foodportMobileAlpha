import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

import { ImageSlider } from "react-native-image-slider-banner";

const advertchunck = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    let _tempData = [];

    firebase
      .firestore()
      .collection("advertpackage")
      .where("active", "==", true)
      .where("approval", "==", "Approved")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          _tempData.push({
            ...doc.data(),
            img: doc.data().image,
          });
        });
        setAds(_tempData);
      });
  });

  return (
    <View>
      <Text style={styles.text}>Your Advertizment Start</Text>
      <ImageSlider
        data={ads}
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
