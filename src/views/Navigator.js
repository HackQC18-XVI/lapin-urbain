import SwipeNavigator from 'react-native-swipe-navigation';

import Camera from './Camera';
import Description from './WasteDescription';

const Navigator = SwipeNavigator({
  Camera: {
    screen: Camera,
    bottom: 'Description',
  },

  Description: {
    screen: Description,
    type: 'over', // push is the default type
  }
});

export default Navigator
