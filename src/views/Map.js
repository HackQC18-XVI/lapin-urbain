// Lib imports
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

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
        var content;
        if (this.props.location.geometry.type === 'Polygon') {
            const polygon = this.props.location.geometry.coordinates[0].map(coordsArr => {
                let coords = {
                    latitude: coordsArr[1],
                    longitude: coordsArr[0],
                  }
                  return coords;
            });
            content = (
                <MapView.Polygon
                    fillColor={color}
                    coordinates={polygon} />
            );
        } else {
            const point = this.props.location.geometry.coordinates;
            content = (
                <MapView.Marker
                    coordinate={point} />
            );
        }

        var color = "rgba(80, 0, 0, 0.5)";
        return (
            <MapView
                style={styles.map}
                showsUserLocation={true}>
                {content}
            </MapView>
        );
    }
}
