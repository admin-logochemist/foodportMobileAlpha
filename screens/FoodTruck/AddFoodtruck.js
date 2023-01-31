import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import Loader from "../../components/foodtruck/Loader.js";
import Input from "../../components/foodtruck/Input.js";
import Buttonz from "../../components/foodtruck/Button.js";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import uploadImageAsync from "../../services/UploadService.js";

export default function AddFoodtruck({ navigation }) {
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

  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState({});
  // const [image, setImage] = useState(null);
  // ==========================working here==========================
  //     console.log(image);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getFormData = () => {
    if (
      resName !== "" &&
      address !== "" &&
      cusine !== "" &&
      phone !== "" &&
      profile !== "" &&
      type !== "" &&
      montime !== "" &&
      tuetime !== "" &&
      Wedtime !== "" &&
      Thurtime !== "" &&
      Fritime !== "" &&
      SatTime !== "" &&
      Suntime !== "" &&
      about !== "" &&
      image !== ""
    ) {
      return true;
    } else {
      console.log("invalid data");
      return false;
    }
  };

  const addFoodtruck = () => {
    if (getFormData()) {
      setLoading(true);
      firebase
        .firestore()
        .collection("resturant")
        .add({
          remail: "hamburger@gmail.com",
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
        })
        .then(async (docRef) => {
          const imageLink = await uploadImageAsync(
            "resturant/" + docRef.id + "/",
            docRef.id,
            imageUrl
          );

          await firebase
            .firestore()
            .collection("resturant")
            .doc(docRef.id)
            .update({
              image: imageLink,
            });

          return docRef.set({
            itemid: docRef.id,
            remail: "hamburger@gmail.com",
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
            image: image,
            time: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      navigation.navigate("BtabNav");
    } else {
      alert("Complete Empty Fields");
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <Loader visible={loading} />
        <ScrollView
          contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
        >
          <Text style={{ color: "black", fontSize: 40, fontWeight: "bold" }}>
            Adding Food Truck
          </Text>
          <Text style={{ color: "grey", fontSize: 18, marginVertical: 10 }}>
            Enter Your Food Truck Details
          </Text>
          <View style={{ marginVertical: 20, marginBottom: 400 }}>
            <Input
              value={resName}
              onChangeText={(text) => setResName(text)}
              placeholder="Enter Food Truck name"
            />
            <Input
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Enter your address"
            />
            <Input
              value={cusine}
              onChangeText={(text) => setCusine(text)}
              placeholder="Dish Name"
            />
            <Input
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType="numeric"
              placeholder="Enter your phone number"
            />
            <Input
              value={profile}
              onChangeText={(text) => setProfile(text)}
              placeholder="Profile"
            />

            <RNPickerSelect
              onValueChange={(value) => setType(value)}
              items={[
                { label: "Moving Food Truck", value: "Moving Food Truck" },
                { label: "Static Food Truck", value: "Static Food Truck" },
              ]}
              style={pickerSelectStyles}
            />

            <Input
              value={montime}
              onChangeText={(text) => setMontime(text)}
              placeholder="Monday Time"
            />
            <Input
              value={tuetime}
              onChangeText={(text) => setTuetime(text)}
              placeholder="Tuesday Time"
            />
            <Input
              value={Wedtime}
              onChangeText={(text) => setWedTime(text)}
              placeholder="Wednesday Time"
            />
            <Input
              value={Thurtime}
              onChangeText={(text) => setThurTime(text)}
              placeholder="Thursday Time"
            />
            <Input
              value={Fritime}
              onChangeText={(text) => setFriTime(text)}
              placeholder="Friday Time"
            />
            <Input
              value={SatTime}
              onChangeText={(text) => setSAtTime(text)}
              placeholder="Saturday Time"
            />
            <Input
              value={Suntime}
              onChangeText={(text) => setSuntime(text)}
              placeholder="Sunday Time"
            />
            <Input
              value={about}
              onChangeText={(text) => setAbout(text)}
              placeholder="About"
            />

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
              />
              {/* {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )} */}
            </View>

            <View style={{ alignItems: "center" }}>
              <Buttonz
                bgColor="red"
                btnLabel="Add"
                textColor="white"
                Press={() => addFoodtruck()}
              />
            </View>
            <Text
              onPress={() => navigation.navigate("FoodTruck")}
              style={{
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Go Back
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 20,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
