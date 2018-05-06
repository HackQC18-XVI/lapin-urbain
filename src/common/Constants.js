var CONSTANTS = {
    HOST_API: 'https://7ae367a0.ngrok.io'
};

var URL = {
    predict: CONSTANTS.HOST_API + '/predict',
    categories: CONSTANTS.HOST_API + '/categories/:id',
    dropInfo: CONSTANTS.HOST_API + '/drop-info/:type',
    pickupInfo: CONSTANTS.HOST_API + '/pickup-info/:type'
};

export {
    CONSTANTS,
    URL
};
