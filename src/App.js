import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import CameraView from './views/Camera';
import MapView from './views/Map';
import Navigator from './views/Navigator';


export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Navigator />
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
