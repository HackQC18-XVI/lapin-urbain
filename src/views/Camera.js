import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

// App imports
import WasteDescription from './WasteDescription';
import PictureService from '../services/PictureService';

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

    // Picture
    async takePicture() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
            PictureService.sendPicture(data.uri);
            // this.props.nav.navigateDown()
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
                </RNCamera>
            </View>
        );
    }
}
