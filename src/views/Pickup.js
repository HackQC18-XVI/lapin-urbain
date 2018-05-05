import React, { Component } from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class Pickup extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>Type: plastic</Text>
                <Text>Name: bottle</Text>
                <Button title="Details" onPress={() => {}} />
            </View>
        );
    }
}
