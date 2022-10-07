import { StatusBar } from 'expo-status-bar';
import { 
    StyleSheet, Text, 
    View, TouchableOpacity
} from 'react-native';

import SafeViewAndroid from '../N_include/SafeViewAndroid';
import HeaderTab from '../Ncomponents/HeaderTab';
import SearchBar from '../Ncomponents/SearchBar';
import Categorys from '../Ncomponents/Categorys';

export default function Home() {
  return (
    <View style={SafeViewAndroid.AndroidSafeArea}>
        <View style={{backgroundColor: '#eee', flex: 1}}>
            <View style={{backgroundColor: 'white', padding:10}}>
                <HeaderTab />
                <SearchBar />
            </View>
            <Categorys />
        </View>
    </View>
  );
}

