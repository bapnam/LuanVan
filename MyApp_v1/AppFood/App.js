import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Home from './Nscreens/Home';
import HeaderTab from './Ncomponents/HeaderTab';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {

  const [SP, setSP] = useState([])

  const getSP = async() =>{
    await axios.get('http://localhost:9000/v1/sanpham/getall')
    .then(res=>{
      setSP(res.data);
      console.log(res.data);
    })
  }

  useEffect(()=>{
    getSP();
    console.log('SP1', SP);
  },[]);

  console.log('SP2', SP);

  return (
    <View>
      {SP.map((sp)=>
      <Text>
        {SP[0].TenSanPham}
      </Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
