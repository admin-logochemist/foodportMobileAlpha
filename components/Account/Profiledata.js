import { View, Text } from 'react-native'
import React from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


    const Profiledata = ({itemData}) => {
      
  return (
<>
   
    <View style={{  padding: 20 }}>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Name</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.name}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Email</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.email}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Password</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.password}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>City</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.city}</Text>
</View>


<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Country</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.country}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Type</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.select}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>State</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.state}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Currency</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.currency}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Phone</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.phone}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Zip</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.zipcode}</Text>
</View>

<View style={{ 
  display: 'flex',
 flexDirection: 'row',
 justifyContent: 'center',
 backgroundColor:"#D3D3D3",
 width:"100%",
 borderRadius: 10,
 padding:10,
 marginBottom:20,
}}>
<Text style={{ fontWeight: "bold", fontSize: 20, marginHorizontal: 20 }}>Acc No#</Text>
      <Text style={{ fontWeight: "bold", color:"white", fontSize: 20, marginHorizontal: 20 }}>{itemData.account_number}</Text>
</View>

    </View>
   
</>
  )
}
export default Profiledata;