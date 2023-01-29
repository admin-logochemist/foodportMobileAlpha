import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const SearchBar = ({ getSearchValue }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={{ marginTop: 10, flexDirection: "row", padding: 10 }}>
      <View
        style={{
          backgroundColor: "#E0E0E0",
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <View style={{ width: "16%", padding: 10 }}>
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="restaurant" size={27} />
          </View>
        </View>
        <TextInput
          style={{
            width: "66%",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
            borderColor: "black",
          }}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity
          onPress={() => getSearchValue(searchText)}
          style={{
            flexDirection: "row",
            backgroundColor: "black",
            padding: 9,
            borderRadius: 30,
            alignItems: "center",
            width: "25%",
            right: 30,
          }}
        >
          <Ionicons
            name="pizza"
            size={18}
            style={{ marginRight: 4, color: "red" }}
          />
          <Text style={{ color: "white", fontWeight: "bold" }}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBar;
