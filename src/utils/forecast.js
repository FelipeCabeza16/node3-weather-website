request = require('request');
const forecast = (latitude, longitude, callback) => {

const url = 'https://api.darksky.net/forecast/208907eded9a380571efc5cd8a4a8e4d/'+encodeURI(latitude)+','+encodeURI(longitude)+'?lang=es&units=si'; 
request({url, json:true}, (error, {body}) => {

if (error)
{
callback('Unable to connect!!', undefined);    
}else if(body.error){
callback('An error was ocurred', undefined);    
}
else{
callback(undefined, body.daily.data[0].summary);    
}
}); 

}


module.exports = forecast;