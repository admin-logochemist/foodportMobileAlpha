import {
  View,
  Text,
  Button,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import {
  Tab,
  TabView,
  FAB,
} from "react-native-elements";
import { useEffect } from "react";
import firebase from "../../firebase.js";

export default function Advertize({ navigation }) {
  const [index, setIndex] = useState(0);
  const [packages, setPackages] = useState([]);

  const Advertdata = () => {
    navigation.navigate(
      "AdvertImageUpload",
      
      {
        packageId: "dgjNGqUCYJ79hBrc6de9",
        durationDays: 10,
      }
    );
  };

  useEffect(() => {
    let _thisData = [];

    firebase
      .firestore()
      .collection("advertize")
      .orderBy("orderno", "asc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          _thisData.push({
            ...doc.data(),
            packageId: doc.id,
          });
        });

        setPackages(_thisData);
      });
  });

  return (
    <>
    <View>
      </View>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "red",
          height: 6,
        }}
        variant="secondary"
      >
        <Tab.Item
          title={packages[0]?.name}
          titleStyle={{ fontSize: 16 }}
          icon={{ name: "timer", type: "ionicon", color: "red" }}
        />
        <Tab.Item
          title={packages[1]?.name}
          titleStyle={{ fontSize: 16 }}
          icon={{ name: "heart", type: "ionicon", color: "red" }}
        />
        <Tab.Item
          title={packages[2]?.name}
          titleStyle={{ fontSize: 15 }}
          icon={{ name: "basket", type: "ionicon", color: "red" }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        {packages.length ? (
          packages.map((_eachPackage, k) => (
            <>
              <TabView.Item
                key={k}
                style={{ backgroundColor: "yellow", width: "100%" }}
              >
                <ImageBackground
                  source={require("../../assets/advertize/alphaimagezero.gif")}
                  style={{
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      margin: 20,
                      backgroundColor: "#F5F5F5",
                      height: 540,
                      alignItems: "center",
                      borderRadius: 20,
                      padding: 40,
                      shadowColor: "black",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 3.75,
                      shadowRadius: 5.84,

                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{ fontSize: 30, fontWeight: "bold", color: "red" }}
                    >
                      {_eachPackage.name} Package
                    </Text>
                    <Text
                      style={{
                        fontSize: 60,
                        fontWeight: "bold",
                        color: "black",
                        marginTop: 20,
                      }}
                    >
                      {_eachPackage.price}$
                    </Text>
                    <Text
                      style={{
                        fontSize: 50,
                        fontWeight: "bold",
                        color: "red",
                        marginTop: -30,
                        marginBottom: 30,
                      }}
                    >
                      {" "}
                      ______
                    </Text>
                    <View style={{ textAlign: "center" }}>
                      {/* add description here */}
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 10,
                        }}
                      >
                        ➤ 1 Advertizment
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 10,
                        }}
                      >
                        ➤ High Quality Image
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 10,
                        }}
                      >
                        ➤ Survival 15 days
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 10,
                        }}
                      >
                        ➤ Arround 3 Times a day
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "black",
                          marginTop: 10,
                        }}
                      >
                        ➤ No Replacement!
                      </Text>
                    </View>
                    <View style={{ marginTop: 50 }}>
                      <FAB
                        onPress={Advertdata}
                        title="Buy Now"
                        upperCase
                        color="red"
                        icon={{ name: "timer", color: "white" }}
                      />
                    </View>
                  </View>
                </ImageBackground>
              </TabView.Item>
            </>
          ))
        ) : (
          <></>
        )}
      </TabView>
    </>
  );
}
