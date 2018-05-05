import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import Voice from 'react-native-voice';
import ApiAiClient from '../common/library/ApiAi/ApiAiClient';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue'
    },

    // Sound icon
    captureSound: {
        position: 'absolute',
        top: 100,
        right: 100
    },
    imgSound: {
        width: 100,
        height: 100
    }
});

export default class Pickup extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            textRecognized: ''
        }
        this.takeSound = this.takeSound.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }
    componentDidMount() {

        var token = 'cd1fafc772034cce8b83c34bdba73387';
        this.client = new ApiAiClient({accessToken: token});
    }

    // Listener
    onSpeechResultsHandler(result) {
        this.setState({
            textRecognized: result.value[0]
        });
    }

    // Recording
    takeSound() {
        if (this.state.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
        this.setState({isRecording: !this.state.isRecording});
    }
    startRecording() {
        Voice.start('fr-FR');
    }
    stopRecording() {
        Voice.stop();
        var text = this.state.textRecognized;
        console.log(text);
        this.client.textRequest(text).then((result) => {
            console.log(result);
            this.setState({showDescription: true});
        });
    }

    render() {
        var item = {
            "nom-collecte": "Aires de réception de matériaux secs",
            "categorie": "Matériaux de construction",
            "description": "Béton, béton armé, mortier et ciment durcis en morceaux",
            "instructions-speciales": "Moins de 30 cm de long"
        }
        return (
            <View style={styles.container}>
                <Text>{this.state.textRecognized}</Text>
                <TouchableOpacity
                    style={styles.captureSound}
                    onPress={this.takeSound}>
                    <Image style={styles.imgSound} source={require('../resources/microphone.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}
