import React, {Component} from 'react';
import Modal from './Modal';

class Table extends Component {
  constructor(props){
    super(props)

    this.state = {
      visible: [false, false, false, false, false, false, false, false, false, false, false, false]
    }

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility(keyOfElement){
    let prevState = this.state.visible;
    prevState[keyOfElement] = !prevState[keyOfElement]
    this.setState({visible: prevState});
  }


  render(){
    let rows = []
    let lastIsDaylight;
    for(var s of this.props.data){
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
        <tr key={s.key} className={trClass} onClick={this.toggleVisibility.bind(this, s.key)}>
        <td className="time">{s.DateTime.match(/\d{2}:\d{2}/)}</td>
        <td><img src={require("./assets/weather_icons/"+iconPath+"-s.png")} alt='no_img'/></td>
        <td><span className="temperature">{s.Temperature.Value}<sup className="celsius">&nbsp; &#8451;</sup></span></td>
        <td><Modal visible={this.state.visible[s.key]} data={s} iconPath={iconPath}/></td>
        </tr>
        )
    lastIsDaylight = s.IsDaylight; // What is last IsDaylight value. We ned it to find twylight zone
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
}


export default Table;