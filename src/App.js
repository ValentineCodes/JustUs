import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import Colors from '../assets/constants/colors';

//Screens
import Home from './screens/Home';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.primary} />
      <Home />
    </View>
  );
};

export default App;
