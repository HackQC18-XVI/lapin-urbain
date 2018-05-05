import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';

import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

const alcatraz = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [-122.42305755615234, 37.82687023785448],
            }
        }
    ]
};

export default class Map extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}>
                    <Geojson geojson={alcatraz} />
                </MapView>
            </View>
        );
    }
}
