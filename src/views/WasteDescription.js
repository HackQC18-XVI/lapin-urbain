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

    // Spinner
    spinner: {
        width: 300,
        height: 300
    },

    //
    dismiss:{
        fontSize: 12,
        position: 'absolute',
        fontWeight: 'bold',
        color: '#D0D0D0',
        top:0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Content
    content: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    contentText: {
        flex: 1,
        position: 'relative'
    },

    description:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#808080',
        top: 20,
        left: 10
    },
    categorie:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#808080',
        top: 50,
        left: 10
    },
    collecte:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#808080',
        top: 70,
        left: 10
    },
    message:{
        fontSize: 12,
        fontWeight: 'bold',
        color: '#808080',
        top: 90,
        left: 10
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

        // Style point
        var color = 'black';
        if (item) {
            switch(item['type-collecte']) {
                case 'dangereux': color = 'red'; break;
                case 'materiaux': color = 'red'; break;
                case 'compost': color = 'orange'; break;
                case 'recyclage': color = 'green'; break
                case 'ordures': color = 'black'; break;
                default: color = 'black'; break;
            }
        }
        var stylePoint = {
            height: 30,
            width: 30,
            borderRadius: 30,
            backgroundColor: color,
            position: 'absolute',
            right: 20,
            top: 20
        }
        return (
            <View style={styles.container}>
                {!ApiService.loading && item ?
                    <Text style={styles.dismiss}>{'cacher'.toUpperCase()}{'\n'}</Text> : null
                }
                {!ApiService.loading && item ?
                    <View style={styles.content}>
                        <View style={styles.contentText}>
                            <Text style={styles.description}>{item['cible-description'].toUpperCase() || item['description'].toUpperCase()}</Text>
                            <Text style={styles.categorie}>{item['categorie']}</Text>
                            <Text style={styles.collecte}>{item['nom-collecte']}</Text>
                            <Text style={styles.message}>{item['location']['properties']['MESSAGE_FR']}</Text>
                            {item['instructions-speciales'] ?
                               <Text>Instructions: {item['instructions-speciales']}</Text> : null
                            }
                            <View style={stylePoint} />
                        </View>
                        <MapView location={item['location']} />
                    </View> :
                    <Image style={styles.spinner} source={require('../resources/loading.gif')} />
                }
            </View>
        );
    }
}
