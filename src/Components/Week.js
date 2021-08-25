import React, { useState } from 'react'
import {  Col, Row } from 'react-bootstrap'
import { API_BASE_URL } from './Api';
import '../Components/Style/Week.css';


export default function Week({onecall}) {
    const [selected, setSelected] = useState(0);
    
    const selectedChangeHandler = (event) => {
        setSelected(+event.currentTarget.dataset.id);
    };

    return (
        <div className="week">
            <Row>
                    
                {onecall.daily ? onecall.daily.map((day, i) => (
                    <Col xs={3} sm={3} md={6} lg={3} className=""
                        key={i}
                        data-id={i}
                        onClick={selectedChangeHandler}
                    >
                        <div className={`${i === selected ? "day-container active " : "day-container"}`}>
                            <p>
                                {new Date(day.dt * 1000).toLocaleDateString("en-GB", {
                                weekday: "short",
                                day: "numeric",
                                month: "numeric",
                                })}
                            </p>
                            
                            <div className=" day-des text-center">
                                <img
                                src={`${API_BASE_URL}img/w/${day.weather[0].icon}.png`}
                                alt=""
                                />
                                <p>
                                {Number.parseInt(day.temp.min)}° -&nbsp;
                                {Number.parseInt(day.temp.max)}°
                                </p>
                            </div>
                        </div>
                    </Col>
                    ))
                : ""}
                    
            </Row>
            <Row className="forecast-des">
                {onecall.daily ? (
                    <h3>
                        {new Date(onecall.daily[selected].dt * 1000).toLocaleDateString(
                            "en-GB",
                            {
                            weekday: "short",
                            month: "numeric",
                            day: "numeric",
                            }
                        )}
                    </h3>
                ) : ("")}
                <Col sm={6} md={6} lg={6}>
                    <p>Temp current: {onecall.daily[selected].temp.morn}°C</p>
                    <p>Temp: {Number.parseInt(onecall.daily[selected].temp.min)}°C</p>
                    <p>Humidity: {onecall.daily[selected].humidity}%</p>
                    <p>Wind speed: {Math.floor((onecall.daily[selected]['wind_speed'] * 18) / 5)} km/h</p>
                    
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <p>Sunrise: {new Date(onecall.daily[selected].sunrise * 1000).toLocaleDateString("en-GB", {
                    hour24: true,
                    hour: "numeric",
                    minute: "2-digit",
                  }).split(',')[1]}</p>
                    <p>Sunset: {new Date(onecall.daily[selected].sunset * 1000).toLocaleDateString("en-GB", {
                    hour24: true,
                    hour: "numeric",
                    minute: "2-digit",
                  }).split(',')[1]}</p>
                    <p>Description: {onecall.daily[selected].weather[0].description}</p>
                    <p>Atmospheric pressure: {onecall.daily[selected].pressure}hPa</p>
                </Col>
                  
                
            </Row>
        </div>
    )
}
