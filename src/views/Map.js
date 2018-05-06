// Lib imports
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

// App imports
import {CONSTANTS} from '../common/Constants';

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
        var myPosition = {
            latitude: CONSTANTS.MY_POSITION.LATITUDE,
            longitude: CONSTANTS.MY_POSITION.LONGITUDE
        };
        var initialRegion = {
            latitude: CONSTANTS.MY_POSITION.LATITUDE,
            longitude: CONSTANTS.MY_POSITION.LONGITUDE,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
        };
        var content;
        if (this.props.location && this.props.location.geometry && this.props.location.geometry.type === 'Polygon') {
            const polygon = this.props.location.geometry.coordinates[0].map(coordsArr => {
                let coords = {
                    latitude: coordsArr[1],
                    longitude: coordsArr[0],
                }
                return coords;
            });
            const color = 'rgba(80, 0, 0, 0.5)';
            content = (
                <MapView.Polygon
                    fillColor={color}
                    coordinates={polygon} />
            );
        } else if (this.props.location && this.props.location.geometry && this.props.location.geometry.type === 'Point') {
            const point = this.props.location.geometry.coordinates;
            content = (
                <MapView.Marker
                    coordinate={{
                        latitude: point[1],
                        longitude: point[0],
                    }} />
            );
        }

        return (
            <MapView style={styles.map} initialRegion={initialRegion}>
                {content ?
                    content : null
                }
                <MapView.Marker coordinate={myPosition} pinColor="blue" />
            </MapView>
        );
    }
}
