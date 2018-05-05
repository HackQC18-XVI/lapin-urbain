import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

const styles = StyleSheet.create({
    containerOpacity: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'red',
        position: 'absolute',
        height: '60%',
        width: '80%',
        top: '20%',
        left: '10%',
        borderRadius: 30
    }
});

export default class WasteDescription extends Component<Props> {
    render() {
        return (
            <View style={styles.containerOpacity}>
                <View style={styles.container}>
                    <Text>Type: plastic</Text>
                    <Text>Name: bottle</Text>
                </View>
            </View>
        );
    }
}
