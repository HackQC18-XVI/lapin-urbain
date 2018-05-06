// Lib imports
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// App imports
import ApiService from '../services/ApiService';
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
    },
    spinner: {
        width: 100,
        height: 100
    }
});

export default class Description extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            item: null
        };
        this.callbackResult = this.callbackResult.bind(this);
    }
    componentDidMount() {
        ApiService.callback = this.callbackResult;
    }
    callbackResult(result) {
        this.setState({item: result});
    }
    render() {
        var item = this.state.item;
        return (
            <View style={styles.container}>
                {!ApiService.loading && item ?
                    <View>
                        <Text>Type: {item['id']}</Text>
                        <Text>Categorie: {item['categorie']}</Text>
                        <Text>Description: {item['description']}</Text>
                        <Text>Instructions: {item['instructions-speciales']}</Text>
                        <MapView location={item['location']} />
                    </View> :
                    <Image style={styles.spinner} source={require('../resources/loading.gif')} />
                }
            </View>
        );
    }
}
