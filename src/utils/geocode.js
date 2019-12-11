request = require ('request');
chalk = require('chalk');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address)+ '.json?access_token=pk.eyJ1IjoiZmVsaXBlY2FiZXphMTYiLCJhIjoiY2szajlnY2F1MGdzMjNqbXZxb3lhZ25vYiJ9.oWFZXE7zLbrMTQ1W8THKOQ&limit=1';
        request({url, json: true},  (error, {body}) => 
        {
                if (error){
                    callback('Unable to connect!!', undefined);
                }
                else if (body.features.lenght === 0){
                    callback('Not founded!!', undefined);
                    }
                else{
                    callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name    
                    });   
                }
        })
    }
    module.exports = geocode;