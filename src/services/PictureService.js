import {URL} from '../common/Constants';


class PictureService {
    constructor() {
        this.loading = false;
    }
    send(urlImage) {
        this.loading = true;

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
                this.loading = false;
                this.callback(response);
            });
        }).catch((error) => {
            this.loading = false;
        });
    }
}

export default new PictureService();
