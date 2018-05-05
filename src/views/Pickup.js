import React, { Component } from 'react';
import {
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
        var item = {
            "nom-collecte": "Aires de réception de matériaux secs",
            "categorie": "Matériaux de construction",
            "description": "Béton, béton armé, mortier et ciment durcis en morceaux",
            "instructions-speciales": "Moins de 30 cm de long"
        }
        return (
            <View style={styles.container}>
                <Text>Type: Beton</Text>
                <Text>Categorie: {item['categorie']}</Text>
                <Text>Description: {item['description']}</Text>
                <Text>Instructions: {item['instructions-speciales']}</Text>
            </View>
        );
    }
}
