import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Pressable,
  ImageBackground,
  Platform,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import React, { useState, useEffect } from "react";
import firebase from "../firebase.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Accounts({ navigation }) {
  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () =>
      await AsyncStorage.getItem("email").then((value) => {
        if (value) {
          setEmail(JSON.parse(value));

          firebase
            .firestore()
            .collection("userid")
            .where("email", "==", JSON.parse(value).toLowerCase())
            .onSnapshot((snapshot) => {
              snapshot.docs.map((doc) => {
                setAccount(doc.data());
              });
            });
        }
      }))();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log("Failed to flash AsyncStorage.");
    }
    navigation.navigate("Auth");
  };

  const EditProfile = () => {
    navigation.navigate("Editaccounts");
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={2}
          source={require("../assets/accounts/alphaz.png")}
        >
          <View style={styles.headerColumn}>
            <Image style={styles.userImage} source={{ uri: account.image }} />
            <Text style={styles.userNameText}>{account.name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {account.city} ,{account.country}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.userBtnWrapper}>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                logout();
              }}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                EditProfile();
              }}
            >
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ backgroundColor: "#f3f6f8" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>State</Text>
            <Text style={styles.userInfoSubTitle}>{account.state}</Text>
          </View>

          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>users</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>Zip Code</Text>
            <Text style={styles.userInfoSubTitle}>{account.zipcode}</Text>
          </View>
        </View>

        <View style={styles.userInfoItemCard}>
          <Icon
            name="mail"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>User Email</Text>
          <Text style={styles.userInfoSubTitlez}>{account.email}</Text>
        </View>

        <View style={styles.userInfoItemCard}>
          <Icon
            name="info"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>User Type</Text>
          <Text style={styles.userInfoSubTitlez}>{account.select}</Text>
        </View>

        <View style={styles.userInfoItemCard}>
          <Icon
            name="phone"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>Phone</Text>
          <Text style={styles.userInfoSubTitlez}>{account.phone}</Text>
        </View>

        <View style={styles.userInfoItemCard}>
          <Icon
            name="house"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>Address</Text>
          <Text style={styles.userInfoSubTitlez}>{account.address}</Text>
        </View>

        <View style={styles.userInfoItemCard}>
          <Icon
            name="rowing"
            underlayColor="transparent"
            iconStyle={styles.placeIconz}
          />
          <Text style={styles.userInfoTitle}>Currency</Text>
          <Text style={styles.userInfoSubTitlez}>{account.currency}</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
    width: "95%",
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  userBtn: {
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,

    elevation: 5,
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoItemCard: {
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.84,

    elevation: 5,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  userInfoSubTitlez: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  containerz: {
    backgroundColor: "grey",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innercontainer: {
    alignItems: "center",
    flexDirection: "coloumn",
  },
  itemHeading: {
    fontWeight: "bold",
  },
  itemText: {
    fontWeight: "300",
  },
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  placeIcon: {
    color: "red",
    fontSize: 26,
  },
  placeIconz: {
    color: "red",
    fontSize: 46,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  userCityText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
});
