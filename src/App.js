import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      a: 'blahblah',
      location: ''
    }
    this.update = this.update.bind(this)
    this.show = this.show.bind(this)
  }

show(){
  //alert('show')
  console.log('-----')
  this.setState({a: 'updated'})
}

update(){
  console.log('1. we have geolocation')

  navigator.geolocation.getCurrentPosition(function(position){

  const locUrl = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=LrltGW8HIbhBXo6GZsMLJP08tUGdJ3nT&q='+ position.coords.latitude+'%2C'+ position.coords.longitude;
   console.log(locUrl) 

  fetch(locUrl)
  .then(function(response){
    return response.json()
  })
  .then(response => response.Key)
  .then(loc => fetch('https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' + loc +'?apikey=LrltGW8HIbhBXo6GZsMLJP08tUGdJ3nT&details=true&metric=true'))
    .then(function(response) {
    return response.json();
  })
  .then(function(response){
    console.log(response)
  // .then(
  //     (result) => {
  //       console.log(result)
  //       this.setState({a: 'real update'})
     // }
    //)
    
    //show()
})
})
}


componentDidMount(){

// Geolocation
if ("geolocation" in navigator) {
  this.update()
  this.show()
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
        <p className="App-intro">
          {this.state.a}
        </p>
      </div>
    );
  }
}

export default App;
