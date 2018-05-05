import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

// App imports
import MapView from './Map';
import PickupView from './Pickup';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#A0A0A0',
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 25,
        borderRadius: 30,
        padding: 50
    }
});

export default class WasteDescription extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <MapView />
            </View>
        );
    }
}
