import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

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

const advertchunck = () => {
  return (
    <View>
      <Text style={styles.text}>Your Advertizment Start</Text>
      <Image
        style={styles.logo}
        source={require("../../assets/logo/logo.png")}
      />
      <Text style={styles.text}>Your Advertizment End</Text>
    </View>
  );
};

export default advertchunck;
