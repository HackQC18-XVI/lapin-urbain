// Lib imports
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
// import RNSiriWaveView from 'react-native-siri-wave-view';
import Voice from 'react-native-voice';

// App imports
import ApiAiClient from '../common/library/ApiAi/ApiAiClient';
import PictureService from '../services/PictureService';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#404040',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Sound icon
    captureSound: {

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
            textRecognized: '',
            startAnimation: true,
            stopAnimation: false
        }
        this.takeSound = this.takeSound.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }
    componentDidMount() {
        const token = 'cd1fafc772034cce8b83c34bdba73387';
        const locale = 'fr';
        this.client = new ApiAiClient({accessToken: token, lang: locale});
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
        this.client.textRequest(text).then((result) => {
            // TODO: extract ITEM ID from result
            console.log(result);
            var id = 'banana.n.02';
            PictureService.sendText(id);
            this.props.nav.navigateDown()
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
                <Text style={styles.text}>
                    {this.state.textRecognized}
                </Text>
                {/*
                <RNSiriWaveView
                    type={1}
                    width={400}
                    height={200}
                    startAnimation={this.state.startAnimation}
                    stopAnimation={this.state.stopAnimation} />
                */}
                <TouchableOpacity
                    style={styles.captureSound}
                    onPress={this.takeSound}>
                    <Image style={styles.imgSound} source={require('../resources/microphone.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}
