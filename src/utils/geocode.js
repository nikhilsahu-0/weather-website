const request = require('request');

const encode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmlraGlsc2FodTczIiwiYSI6ImNrd3N0MjcybzBzZXQyb2xzaHlpZ3QwOTAifQ.QKSygT-soChlSo9UStTEuQ&limit=1`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("[ERROR]Can't connect to the network", undefined);
        } else if (response.body.features.length === 0) {
            callback("[ERROR]Can't find the location , try another one", undefined);
        } else {
            const features = response.body.features[0];
            callback(undefined, {
                longitude: features.center[0],
                latitude: features.center[1],
                location: features.place_name
            });
        }
    });
};

module.exports = {
    encode: encode
};