import {URL} from '../common/Constants';


class PictureService {
    static sendPicture(urlImage) {
        // Prepare data
        var photo = {
            uri: urlImage,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        var body = new FormData();
        body.append('file', photo);
        // Request
        fetch(URL.photo, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: body
        }).then((response) => {
            response.json().then((response) => {
                var plateNumber = ''
                if (response && response.results && response.results.length) {
                    plateNumber = response.results[0].candidates[0].plate
                }
                this.setState({
                    result: response,
                    plate: plateNumber
                });
            })
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default PictureService;
