const request = require("request")

const forcast=(latitude,longitude,callback)=>{
   const url='http://api.weatherstack.com/current?access_key=4a8dcf85042836f7bbf79cbc7e2e30c0&query='+latitude+','+longitude+'&units=f'
    request({
        url,
        json:true
    },(error,{body})=>{
        if(error){
            callback('unable to connect to the weather service');
        } if(body.error){
            callback('unable to find the location, try another location');
        } else{
            callback(undefined,{
                description:body.current.weather_descriptions[0],
                weather:"It is currently,"+body.current.temperature + "it is feels like,"+ body.current.feelslike
            });
        }
    });

};

module.exports=forcast;