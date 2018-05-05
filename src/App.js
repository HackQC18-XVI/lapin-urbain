import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import CameraView from './views/Camera';
import MapView from './views/Map';


export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <CameraView />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});
