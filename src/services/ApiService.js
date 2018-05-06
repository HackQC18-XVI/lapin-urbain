import {URL} from '../common/Constants';


class ApiService {
    constructor() {
        this.loading = false;
    }
    sendPicture(urlImage) {
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
                response['location'] = this.getLocationInfo(true, response['type-collecte']);
                this.callback(response);
            });
        }).catch((error) => {
            this.loading = false;
        });
    }
    sendText(id) {
        // Request
        fetch(URL.categories.replace(':id', id), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            response.json().then((response) => {
                this.loading = false;
                response['location'] = this.getLocationInfo(true, response['type-collecte']);
                this.callback(response);
            });
        }).catch((error) => {
            this.loading = false;
        });
    }
    async getLocationInfo(isPickup, type) {
        if (isPickup) {
            return this.getPickupInfo(type);
        } else {
            return this.getDropInfo(type);
        }
    }
    async getDropInfo(type) {
        // Request
        const response = await fetch(URL.dropInfo.replace(':type', type), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    }
    async getPickupInfo(type) {
        // Request
        const response = await fetch(URL.pickupInfo.replace(':type', type), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    }
}

export default new ApiService();
