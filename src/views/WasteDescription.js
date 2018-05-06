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
        backgroundColor: '#FFF',
        position: 'absolute',
        height: '90%',
        width: '100%',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        width: 300,
        height: 300
    },
    dismiss:{
        fontSize: 14,
        position: 'absolute',
        fontWeight: 'bold',
        color: '#b2b2b2',
        top:0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categorie:{
        top:10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#808080',
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
        console.log(item)
        return (
            <View style={styles.container}>
                {!ApiService.loading && item ?
                    <Text style={styles.dismiss}>{'cacher'.toUpperCase()}{'\n'}</Text> : null
                }
                {!ApiService.loading && item ?
                    <View>
                        <Text style={styles.categorie}>{item['categorie']}</Text>
                        <Text>{item['nom-collecte']}</Text>
                        {item['instructions-speciales'] ?
                           <Text>Instructions: {item['instructions-speciales']}</Text> : null
                        }
                        <MapView location={item['location']} />
                    </View> :
                    <Image style={styles.spinner} source={require('../resources/loading.gif')} />
                }
            </View>
        );
    }
}
