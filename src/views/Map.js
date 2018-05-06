// Lib imports
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';

// Styles
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
        height: 200
    }
});

export default class Map extends Component<Props> {
    render() {
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
        // WE CAN ACCESS this.props.location here

        return (
            <View style={styles.container}>
                <MapView style={styles.map}>
                    <Geojson geojson={alcatraz} />
                </MapView>
            </View>
        );
    }
}
