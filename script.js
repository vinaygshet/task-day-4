var request =new XMLHttpRequest();
request.open('GET','https://restcountries.eu/rest/v2/all',true);
request.send();
request.onload=function(){
    var data = JSON.parse(this.response);
    for( var i in data){
        try{
            var cname = data[i].name;
            var latlong = data[i].latlng;
            if(latlong === 0) throw new Error('Latitude of this particular location not found');
            wd(cname,...latlong);

        }
        catch(e){
            console.log('invalid coordinate detials'+cname+''+e.message);

        }
    }
};
var wd=function(cname,lat,long){
    var key='196b5cd1f46ad8a1b81d0ba587c0c1ab';
    var URL =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
    var weather = new XMLHttpRequest();
    weather.open('GET',URL,true);
    weather.send();
    weather.onload=function(){
        try{
            var result = JSON.parse(this.response);
            console.log(`${cname}:${result.main.temp}`);
        }
        catch(e){
            console.log('invalid response from'+cname);
        }
    }
}