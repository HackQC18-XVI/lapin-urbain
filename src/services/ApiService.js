import {CONSTANTS, URL} from '../common/Constants';


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
                this.getLocationInfo(response['depot'], response['type-collecte']).then((responseLocation) => {
                    if (responseLocation.status === 200) {
                        responseLocation.json().then((resultLocation) => {
                            this.loading = false;
                            response['location'] = resultLocation;
                            this.callback(response);
                        });
                    } else {
                        this.loading = false;
                        this.callback(response);
                    }
                });
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
                this.getLocationInfo(response['depot'], response['type-collecte']).then((responseLocation) => {
                    if (responseLocation.status === 200) {
                        responseLocation.json().then((resultLocation) => {
                            this.loading = false;
                            response['location'] = resultLocation;
                            this.callback(response);
                        });
                    } else {
                        this.loading = false;
                        this.callback(response);
                    }
                });
            });
        }).catch((error) => {
            this.loading = false;
        });
    }
    getLocationInfo(isDepot, type) {
        if (isDepot) {
            return this.getDropInfo(type);
        } else {
            return this.getPickupInfo(type);
        }
    }
    getDropInfo(type) {
        // Request
        var longitude = CONSTANTS.MY_POSITION.LONGITUDE;
        var latitude = CONSTANTS.MY_POSITION.LATITUDE;
        var params = '?longitude=' + longitude + '&latitude=' + latitude;
        return fetch(URL.dropInfo.replace(':type', type) + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
    }
    getPickupInfo(type) {
        // Request
        var longitude = CONSTANTS.MY_POSITION.LONGITUDE;
        var latitude = CONSTANTS.MY_POSITION.LATITUDE;
        var params = '?longitude=' + longitude + '&latitude=' + latitude;
        return fetch(URL.pickupInfo.replace(':type', type) + params, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
    }
}

export default new ApiService();
