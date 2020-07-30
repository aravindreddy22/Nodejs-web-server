var request=require('request');

const geo_code = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJhdmluZHJlZGR5MTk5MSIsImEiOiJja2N3NWhwbDQwYXJsMnZtZmExbDh5cmh4In0.gAvhUrDoDBVArGsLCt1dqA';
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('No Matching result is found', undefined);
        } else {
               const data = {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data);
        }
    })
}

module.exports=geo_code;