import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import awlogo from './accuweatherLogo.png'



function Table(props){
  //return <div>{JSON.stringify(props)}</div>
  let rows = []
  // let lastIsDaylight = true;
  
  for(var s of props.data){
    console.log(s)
    let iconPath;
    if(s.WeatherIcon<10){
      iconPath = '0'+s.WeatherIcon
    } else {
      iconPath = s.WeatherIcon
    }
    let trClass;
    if(lastIsDaylight === undefined || s.IsDaylight === lastIsDaylight){
      if(s.IsDaylight){
        trClass = 'day'
      } else {
        trClass = 'night'
      }
    } else {
      trClass = (lastIsDaylight === true) ? 'sunset' : 'sunrise'
    }


 
    rows.push(
      <tr key={s.key} className={trClass}>
      <td >{s.DateTime.match(/\d{2}:\d{2}/)}</td>
      <td><img src={require("./assets/weather_icons/"+iconPath+"-s.png")} alt='no_img'/></td>
      <td>Temperature: {s.Temperature.Value} C</td>
      <td>Real Feel Temperature: {s.RealFeelTemperature.Value} C</td>
      </tr>)
    let lastIsDaylight = s.IsDaylight; // What is last IsDaylight value. We ned it to find twylight zone
  }

    return (
    <table>
    <thead>
    </thead>
    <tbody>
    {rows}
    </tbody>
    </table>
    )
}
   



class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      place: ''
    }
    this.update = this.update.bind(this)
  }


//TESTING UPDATE//////
//  update(){
//    const response = [{"DateTime":"2018-07-26T22:00:00+02:00","EpochDateTime":1532635200,"WeatherIcon":35,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":23.1,"Unit":"C","UnitType":17},"RealFeelTemperature":{"Value":23.7,"Unit":"C","UnitType":17},"WetBulbTemperature":{"Value":20.6,"Unit":"C","UnitType":17},"DewPoint":{"Value":19.2,"Unit":"C","UnitType":17},"Wind":{"Speed":{"Value":5.6,"Unit":"km/h","UnitType":7},"Direction":{"Degrees":308,"Localized":"NW","English":"NW"}},"WindGust":{"Speed":{"Value":9.3,"Unit":"km/h","UnitType":7}},"RelativeHumidity":78,"Visibility":{"Value":11.3,"Unit":"km","UnitType":6},"Ceiling":{"Value":9144,"Unit":"m","UnitType":5},"UVIndex":0,"UVIndexText":"Low","PrecipitationProbability":25,"RainProbability":25,"SnowProbability":0,"IceProbability":0,"TotalLiquid":{"Value":0,"Unit":"mm","UnitType":3},"Rain":{"Value":0,"Unit":"mm","UnitType":3},"Snow":{"Value":0,"Unit":"cm","UnitType":4},"Ice":{"Value":0,"Unit":"mm","UnitType":3},"CloudCover":35,"MobileLink":"http://m.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&hbhhour=22&unit=c&lang=en-us"}, 

// {"DateTime":"2018-07-26T23:00:00+02:00","EpochDateTime":1532638800,"WeatherIcon":35,"IconPhrase":"Partly cloudy","IsDaylight":false,"Temperature":{"Value":22.3,"Unit":"C","UnitType":17},"RealFeelTemperature":{"Value":22.7,"Unit":"C","UnitType":17},"WetBulbTemperature":{"Value":20.2,"Unit":"C","UnitType":17},"DewPoint":{"Value":18.9,"Unit":"C","UnitType":17},"Wind":{"Speed":{"Value":5.6,"Unit":"km/h","UnitType":7},"Direction":{"Degrees":293,"Localized":"WNW","English":"WNW"}},"WindGust":{"Speed":{"Value":9.3,"Unit":"km/h","UnitType":7}},"RelativeHumidity":81,"Visibility":{"Value":9.7,"Unit":"km","UnitType":6},"Ceiling":{"Value":9144,"Unit":"m","UnitType":5},"UVIndex":0,"UVIndexText":"Low","PrecipitationProbability":34,"RainProbability":34,"SnowProbability":0,"IceProbability":0,"TotalLiquid":{"Value":0,"Unit":"mm","UnitType":3},"Rain":{"Value":0,"Unit":"mm","UnitType":3},"Snow":{"Value":0,"Unit":"cm","UnitType":4},"Ice":{"Value":0,"Unit":"mm","UnitType":3},"CloudCover":33,"MobileLink":"http://m.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/rs/belgrade/298198/hourly-weather-forecast/298198?day=1&hbhhour=23&unit=c&lang=en-us"},

// {"DateTime":"2018-07-26T23:00:00+02:00","EpochDateTime":1532638800,"WeatherIcon":33}
// ];

// response.map(function(val,index,arr){return val.key = index})
// //console.log(response)
//    this.setState({data: response})
//    //console.log(this.state.data)
//  }
///////////////////////


update(){
  const that = this; // save this object before enter the fetch child function
  console.log('1. we have geolocation')

  navigator.geolocation.getCurrentPosition(function(position){

  const locUrl = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=LrltGW8HIbhBXo6GZsMLJP08tUGdJ3nT&q='+ position.coords.latitude+'%2C'+ position.coords.longitude;
   console.log(locUrl) 

  fetch(locUrl)
  .then(function(response){
    console.log(response); // show place data
    that.setState({place: response})
    return response.json()
  })
  .then(response => response.Key)
  .then(loc => fetch('https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + loc +'?apikey=LrltGW8HIbhBXo6GZsMLJP08tUGdJ3nT&details=true&metric=true'))
    .then(function(response) {

    return response.json();
  })
  .then(function(response){

// insert key
  response.map(function(val,index,arr){return val.key = index})

   that.setState({data: response})


})
})
}


componentDidMount(){

// Geolocation
if ("geolocation" in navigator) {
  this.update()
  // this.show()
} else {
  alert("You must have geolocation activated!!!")
}
}




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Weather App</h1>
        </header>
        <Table data={this.state.data}/>
{/*        {this.state.data.map((singleData, key) => 
          <Table key={key} data={singleData}
          )}*/}
          <footer className="App-footer">
          <img className="AccuWeather-logo" src={awlogo} alt="AccuWeather Logo"/>
          </footer>

      </div>
    );
  }
}

export default App;
