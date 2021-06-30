import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

import Colors from '../../assets/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  notesScrollView: {
    flex: 1,
    paddingTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    position: 'absolute',
    left: 5,
    bottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: Colors.secondary,
    width: '80%',
  },
  inputField: {
    flex: 1,
  },
  iconsContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 200,
    width: '20%',
  },
});

export default styles;
