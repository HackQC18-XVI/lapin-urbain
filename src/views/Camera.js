import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import WasteDescription from './WasteDescription';

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
            showDescription: false
        }
        this.takePicture = this.takePicture.bind(this);
    }
    takePicture = async function() {
        if (this.camera) {
            this.setState({showDescription: true});
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
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
                        onPress={this.takePicture}>
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
