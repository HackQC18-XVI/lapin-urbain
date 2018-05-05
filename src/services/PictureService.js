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
        fetch(URL.predict, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: body
        }).then((response) => {
            response.json().then((response) => {
                console.log(response);
                if (response && response.results && response.results.length) {

                }

            })
        }).catch((error) => {
            console.log(error);
        });
    }
}

export default PictureService;
