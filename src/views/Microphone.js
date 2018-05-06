// Lib imports
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import RNSiriWaveView from 'react-native-siri-wave-view';
import Voice from 'react-native-voice';

// App imports
import ApiAiClient from '../common/library/ApiAi/ApiAiClient';
import ApiService from '../services/ApiService';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Sound icon
    captureSound: {

    },
    imgSound: {
        width: 200,
        height: 200
    },
    wave: {
        position: 'absolute',
        bottom: 10
    }
});

export default class Pickup extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            textRecognized: '',
            error: null,
            startAnimation: false,
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
        this.setState({error: null, startAnimation: true, stopAnimation: false});
    }
    stopRecording() {
        Voice.stop();
        this.setState({error: null, startAnimation: false, stopAnimation: true});
        var text = this.state.textRecognized;
        this.client.textRequest(text.toLowerCase()).then((result) => {
            var id;
            try {
                id = result['result']['parameters']['ITEM'];
            } catch(error) {
                id = '';
            }
            if (!id || id == '') {
                this.setState({error: 'Aucun résultat'});
            } else {
                ApiService.sendText(id);
                this.props.nav.navigateDown()
            }
        });
    }

    render() {
        // Style text
        var text = {
            fontSize: 24,
            position: 'absolute',
            top: 100,
            color: this.state.error ? '#8bc441' : '#16aa9d'
        };
        return (
            <View style={styles.container}>
                <Text style={text}>
                    {this.state.error ? this.state.error.toUpperCase() : this.state.textRecognized}
                </Text>
                <TouchableOpacity
                    style={styles.captureSound}
                    onPress={this.takeSound}>
                    <Image style={styles.imgSound} source={require('../resources/mascot.png')} />
                </TouchableOpacity>
                <View style={styles.wave}>
                    <RNSiriWaveView
                        type={1}
                        width={360}
                        height={200}
                        startAnimation={this.state.startAnimation}
                        stopAnimation={this.state.stopAnimation} />
                </View>
            </View>
        );
    }
}
