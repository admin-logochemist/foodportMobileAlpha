import { TextInput } from "react-native";
import React from "react";

const Field = (props, palceholder) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: "black",
        paddingHorizontal: 10,
        width: "78%",
        backgroundColor: "rgb(220,220, 220)",
        marginVertical: 10,
        paddingVertical: 16,
      }}
      placeholderTextColor="black"
      palceholder={palceholder}
    ></TextInput>
  );
};
export default Field;
