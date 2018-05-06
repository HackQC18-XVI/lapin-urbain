// Lib imports
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';

// Styles
const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 400,
        bottom: 0
    }
});

export default class Map extends Component<Props> {
    render() {
        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: {},
                    geometry: this.props.location.geometry
                }
            ]
        };
        return (
            <MapView style={styles.map}>
                <Geojson geojson={geojson} />
            </MapView>
        );
    }
}
