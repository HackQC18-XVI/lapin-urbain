import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Voice from 'react-native-voice';

// App imports
import WasteDescription from './WasteDescription';
import ApiAiClient from '../common/library/ApiAi/ApiAiClient';


const styles = StyleSheet.create({
    // General
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    // Capture icon
    captureIcon: {
        width: 70,
        height: 70,
        borderRadius: 70,
        borderWidth: 5,
        borderColor: '#FFF',
        backgroundColor: 'transparent',
        marginBottom: 15,
    },

    // Sound icon
    captureSound: {
        position: 'absolute',
        top: 15,
        right: 15
    },
    imgSound: {
        width: 45,
        height: 45
    }
});

export default class CameraView extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showDescription: false,
            isRecording: false,
            textRecognized: ''
        }
        this.takePicture = this.takePicture.bind(this);
        this.takeSound = this.takeSound.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
        var token = 'cd1fafc772034cce8b83c34bdba73387';
        this.client = new ApiAiClient({accessToken: token});
    }
    onSpeechResultsHandler(result) {
        this.setState({
            textRecognized: result.value[0]
        });
    }

    // Picture
    async takePicture() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
            this.setState({showDescription: true});
        }
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
            console.log(result);
            this.setState({showDescription: true});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {this.camera = ref;}}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}>
                    <TouchableOpacity
                        style={styles.captureIcon}
                        onPress={this.takePicture.bind(this)}
                        underlayColor="rgba(255, 255, 255, 0.5)">
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.captureSound}
                        onPress={this.takeSound}>
                        <Image style={styles.imgSound} source={require('../resources/microphone.png')} />
                    </TouchableOpacity>
                    {this.state.showDescription ?
                        <WasteDescription /> : null
                    }
                </RNCamera>
            </View>
        );
    }
}
