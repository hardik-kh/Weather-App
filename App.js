import React from 'react';
import { StyleSheet, View,ScrollView ,FlatList} from 'react-native';
import Search from './screens/Search';
import Day from './screens/Day';
import Navigator from './routes/homeStack';



export default function App() {


    return (
      <Navigator 
      navigationOptions={{headerShown: false}}/>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

});
