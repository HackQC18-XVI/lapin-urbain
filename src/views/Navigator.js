import SwipeNavigator from 'react-native-swipe-navigation';

import Camera from './Camera';
import Microphone from './Microphone';
import Description from './WasteDescription';

const Navigator = SwipeNavigator({
  Camera: {
    screen: Camera,
    bottom: 'Description',
    left: 'Microphone'
  },
  Microphone: {
    screen: Microphone,
    type: 'push'
  },

  Description: {
    screen: Description,
    type: 'over', // push is the default type
  }
});

export default Navigator
