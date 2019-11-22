import React, {Component} from 'react';

class Modal extends Component {
	render(){
		console.log(this.props)
		return( <div className={this.props.visible?"show":"hidden"}> 
			        <div className="modal"> 
			            <img className="modalIcon" src={require("./assets/weather_icons/"+this.props.iconPath+"-s.png")} alt='no_img'/>
			            <b>{this.props.data.IconPhrase}</b> <br/><br/>
			            Time: {this.props.data.DateTime.match(/\d{2}:\d{2}/)} h<br/> 
			            Temperature: {this.props.data.Temperature.Value} &#8451;<br/>
			            RealFeel: {this.props.data.RealFeelTemperature.Value} &#8451;<br/>
			            Relative Humidity: {this.props.data.RelativeHumidity} %<br/>
			            Cloud Cover: {this.props.data.CloudCover} %<br/>
			            Wind: {this.props.data.Wind.Speed.Value} km/h, Direction: {this.props.data.Wind.Direction.English} <br/>
			            Rain: {this.props.data.Rain.Value} mm<br/>
			            Snow: {this.props.data.Snow.Value} cm <br/>
			            Ice: {this.props.data.Ice.Value} mm <br/>
			            Total Liquid: {this.props.data.TotalLiquid.Value} mm <br/>
			            UV Index: {this.props.data.UVIndex} &nbsp; {this.props.data.UVIndexText}<br/>
			            Visibility: {this.props.data.Visibility.Value} km <br/>
			            <b>{this.props.data.IsDaylight?"Daylight":"Night"}</b>

			        </div>
			    </div>);
	}
}

export default Modal;