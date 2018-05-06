// Lib imports
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// App imports
import PictureService from '../services/PictureService';
import MapView from './Map';

// Styles
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

export default class Pickup extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
        this.callbackResult = this.callbackResult.bind(this);
    }
    componentDidMount() {
        PictureService.callback = this.callbackResult;
    }
    componentWillUnmount() {
        console.log('unmount');
    }
    callbackResult(result) {
        this.setState({item: result});
    }
    render() {
        var item = this.state.item;
        return (
            <View style={styles.container}>
                {!PictureService.loading ?
                    <View>
                        <Text>Type: {item['id']}</Text>
                        <Text>Categorie: {item['categorie']}</Text>
                        <Text>Description: {item['description']}</Text>
                        <Text>Instructions: {item['instructions-speciales']}</Text>
                        <MapView />
                    </View> :
                    <Text>Loading...</Text>
                }
            </View>
        );
    }
}
