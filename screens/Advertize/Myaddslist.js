import { View, Text, SafeAreaView, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";
import { Divider, Button, Tab, TabView } from "react-native-elements";
import firebase from "../../firebase.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";

const Myaddslist = ({ navigation }) => {

  const [index, setIndex] = useState(0);
  const [pendingAds, setPendingAds] = useState('');
  const [approvedAds, setApprovedAds] = useState('');
  const [rejectedAds, setRejectedAds] = useState('');
  const [paidAds, setPaidAds] = useState('');
  const [email, setEmail] = useState("");


  useEffect(() => {
    (async () =>
      await AsyncStorage.getItem("email").then((value) => {
        if (value) {
          setEmail(JSON.parse(value));

          firebase.firestore().collection("advertpackage")
            .where("uEmail", "==", JSON.parse(value).toLowerCase())
            .where("approved", "==", "approved")
            .onSnapshot((snapshot) => {
              var tempdata = [];

              snapshot.docs.map((doc) => {
                tempdata.push({ id: doc.id, ...doc.data() });
              });

              setApprovedAds(tempdata);
            });

          firebase.firestore().collection("advertpackage")
            .where("uEmail", "==", JSON.parse(value).toLowerCase())
            .where("approved", "==", "pending")
            .onSnapshot((snapshot) => {
              var tempdata = [];

              snapshot.docs.map((doc) => {
                tempdata.push({ id: doc.id, ...doc.data() });
              });

              setPendingAds(tempdata);
            });
        }

        firebase.firestore().collection("advertpackage")
          .where("uEmail", "==", JSON.parse(value).toLowerCase())
          .where("approved", "==", "rejected")
          .onSnapshot((snapshot) => {
            var tempdata = [];

            snapshot.docs.map((doc) => {
              tempdata.push({ id: doc.id, ...doc.data() });
            });

            setRejectedAds(tempdata);
          });
        
        firebase.firestore().collection("advertpackage")
          .where("uEmail", "==", JSON.parse(value).toLowerCase())
          .where("approved", "==", "paid")
          .onSnapshot((snapshot) => {
            var tempdata = [];

            snapshot.docs.map((doc) => {
              tempdata.push({ id: doc.id, ...doc.data() });
            });

            setPaidAds(tempdata);
          });
      }))();

  }, [email]);

  const checkoutadvert = (ad) => {
    navigation.navigate("Advertpay", {...ad})
  }

  return (
    <>
    <SafeAreaView>
    <TouchableOpacity
    style={{ flexDirection: "row" }}
    onPress={() => navigation.goBack()}
  >
    <AntDesign name="back" size={27} />
    <Text style={{ fontSize: 20, textAlign: "center" }}>GoBack</Text>
  </TouchableOpacity>
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
          title={'Approved'}
          titleStyle={{ fontSize: 8 }}
          icon={{ name: "timer", type: "ionicon", color: "red" }}
        />
        <Tab.Item
          title={'Pending'}
          titleStyle={{ fontSize: 8 }}
          icon={{ name: "heart", type: "ionicon", color: "red" }}
        />
        <Tab.Item
          title={'Paid'}
          titleStyle={{ fontSize: 8 }}
          icon={{ name: "basket", type: "ionicon", color: "red" }}
        />
        <Tab.Item
          title={'Rejected'}
          titleStyle={{ fontSize: 8 }}
          icon={{ name: "basket", type: "ionicon", color: "red" }}
        />
      </Tab>
      </SafeAreaView>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          key={0}
          style={{ width: "100%" }}
        >
          <ScrollView>
            {
              approvedAds && approvedAds?.length > 0 ?
                approvedAds.map((ad, index) =>
                  <View key={index} style={styles.card}>
                    <View style={styles.cardContent}>

                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>{ad?.name}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package start date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateStart).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package end date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateEnd).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Price</Text>
                        <Text style={styles.description}>${ad?.amount_due}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Status</Text>
                        <Text style={styles.description}>{ad?.approved}</Text>
                      </View>

                      <View style={styles.container}>
                        <Button title="Delete" buttonStyle={styles.button} />
                        <Button title="Pay" buttonStyle={styles.buttonpay} onPress={() => checkoutadvert(ad)} />
                      </View>
                    </View>
                  </View>
                )
                : ""
            }

          </ScrollView>

        </TabView.Item>

        <TabView.Item
          key={1}
          style={{ width: "100%" }}
        >
          <ScrollView>

            {
              pendingAds && pendingAds?.length > 0 ?
                pendingAds.map((ad, index) =>
                  <View key={index} style={styles.card}>
                    <View style={styles.cardContent}>

                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>{ad?.name}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package start date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateStart).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package end date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateEnd).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Price</Text>
                        <Text style={styles.description}>${ad?.amount_due}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Status</Text>
                        <Text style={styles.description}>{ad?.approved}</Text>
                      </View>

                      <View style={styles.container}>
                        <Button title="Cancel" buttonStyle={styles.button} />
                      </View>
                    </View>
                  </View>
                )
                : ""
            }
          </ScrollView>
        </TabView.Item>

        <TabView.Item
          key={2}
          style={{ width: "100%" }}
        >
          <ScrollView>
            {
              paidAds && paidAds?.length > 0 ?
                paidAds.map((ad, index) =>
                  <View key={index} style={styles.card}>
                    <View style={styles.cardContent}>

                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>{ad?.name}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package start date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateStart).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package end date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateEnd).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Price</Text>
                        <Text style={styles.description}>${ad?.amount_due}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Status</Text>
                        <Text style={styles.description}>{ad?.approved}</Text>
                      </View>
                    </View>
                  </View>
                )
                : ""
            }
          </ScrollView>
        </TabView.Item>
        
        <TabView.Item
          key={2}
          style={{ width: "100%" }}
        >
          <ScrollView>
            {
              rejectedAds && rejectedAds?.length > 0 ?
                rejectedAds.map((ad, index) =>
                  <View key={index} style={styles.card}>
                    <View style={styles.cardContent}>

                      <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>{ad?.name}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package start date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateStart).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>package end date</Text>
                        <Text style={styles.description}>{new Date(ad?.packageDateEnd).toDateString()}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Price</Text>
                        <Text style={styles.description}>${ad?.amount_due}</Text>
                      </View>

                      <View style={styles.containerText}>
                        <Text style={styles.description}>Status</Text>
                        <Text style={styles.description}>{ad?.approved}</Text>
                      </View>
                    </View>
                  </View>
                )
                : ""
            }
          </ScrollView>
        </TabView.Item>
        </TabView>
        
        
        </>
  )
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: '#666',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  buttonpay: {
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    width: 70
  },
});

export default Myaddslist;