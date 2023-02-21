import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Stripe from '../../components/Stripe/Stripe';

const Advertpay = () => {
  return (
    <SafeAreaView>
    <View>
      <Text style={{textAlign:"center"}}>Pay For the Package</Text>
      <ScrollView>
      <Stripe />
      </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default Advertpay;