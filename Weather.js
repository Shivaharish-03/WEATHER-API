import React from "react";
import axios from "axios";
import './Weather.css';

class Weather extends React.Component {
    constructor(props) {
        super()
        const today = new Date();
        this.state = { weatherRep: [], searchCity: "", weatherdesc: "" ,
        day: today.toLocaleString('default', { weekday: 'long' }),
        date: today.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
      
   
    }

   
    searchCity = (event) => {
        console.log(event.target.value)
        this.setState({ searchCity: event.target.value })
    }


    getReport = (query) => {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=f897fd57bbacc9f247be1bf143478f90"
        axios.get(url).then((res => this.setState({
            weatherRep: res.data.weather,
            desc: res.data.weather[0],
            cityName: res.data.name,
            temperature: res.data.main.temp,
            country: res.data.sys.country,
            humidity:res.data.main.humidity,
            wind:res.data.wind.speed

        })))
            .catch((err) => console.log(err))
    }

    submitted = (event) => {
        event.preventDefault();
        this.getReport(this.state.searchCity)

    }

    render() {
        return (

            <>
                <div>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h5 className="container">Weather Report</h5>
                                <div>
                                        <div className="card-container">
                                        <form onSubmit={this.submitted}>
                                            <div class="input-group mb-3">
                                                <input type="text" onChange={this.searchCity} className="form-control search-text text-white" placeholder="search city" aria-label="city name" aria-describedby="basic-addon2" />
                                                <button type="submit" class="input-group-text search-icon" id="basic-addon2"><i class="fas fa-search"></i></button>
                                            </div>
                                        </form>
                                        {
                                            this.state.weatherRep.map((rep) =>
                                                <>
                                    
                                                    <div className="weather-cont bgback ">
                                                        <h1 className="card-text cwhite">Weather in {this.state.cityName}</h1>                                                    
                                                        <div>
                                                        <h1 className="card-text temp mb-0 cwhite">{Math.round(this.state.temperature - 273.15)} &#8451;</h1>
                                                        </div>
                                                        <div className="desc cwhite">
                                                            <h3>{this.state.desc.description}</h3>
                                                            
                                                            <img src={`https://openweathermap.org/img/wn/${rep.icon}.png`} alt="" />
                                                        </div>
                                                        <div class="input-desc-group halign ">
                                                                <div className="py-2">
                                                                <span><i class="fas fa-tint"></i> {this.state.humidity}%|</span>
                                                                <span> <i class="fas fa-wind"></i> {this.state.wind} Km/h</span>
                                                                </div>                                        
                                                        </div>
                                                        <div>
                                                        <p className="pt-4 cwhite "> <i class="far fa-calendar-alt "></i> {this.state.day} {this.state.date}</p>
                                                        </div>
                                                    </div>
                                                    

                                                   
                                                    
                                                
                                                

                                                </>
                                            )
                                        }

                                        </div>
                                    </div>
                                
                            </div>
    
                        </div>
                    </div>
                </div>






            </>
        )
    }
}

export default Weather;