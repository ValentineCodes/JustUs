import {StyleSheet, Dimensions} from 'react-native';

import Colors from '../../assets/constants/colors';

const screenWidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    marginTop: 10,
    marginLeft: 10,
    padding: 15,
    borderRadius: 12,
    width: screenWidth / 2.2,
  },
  note: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  timestamp: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: screenWidth / 30,
    marginTop: 10,
  },
});
