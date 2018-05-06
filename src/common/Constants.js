var CONSTANTS = {
    HOST_API: 'https://e7e36d5d.ngrok.io',

    // Position
    MONTREAL: {
        LONGITUDE: -73.56229610000003,
        LATITUDE: 45.4946761
    },
    QUEBEC: {
        LONGITUDE: -71.2079809,
        LATITUDE: 46.8138783
    },
    SHERBROOKE: {
        LONGITUDE: -71.89291070000002,
        LATITUDE: 45.4041718
    }
};

// My position
CONSTANTS.MY_POSITION = CONSTANTS.QUEBEC;

// Url
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
