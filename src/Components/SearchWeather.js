import React from 'react'
import { Col, Form, Spinner } from 'react-bootstrap'
import '../Components/Style/SearchWeather.css'



export default function SearchWeather({typecity,setTypecity, onecall,searchCity,data}) {

    const img = `https://openweathermap.org/img/wn/${data?.weather[0].icon}@4x.png`;
    const handleChange = (event) => {
        setTypecity(event.target.value);  
    }
    
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`
      }


    return (
        <Col lg={3} md={4} sm={12} className="col-search search-form" >
          
          <Form className="form">
            <Form.Control 
              type="text" 
              placeholder="Search" 
              className="mt-20"
              value={typecity}
              onChange={handleChange}
              onKeyDown={searchCity}
            />
            {!data 
              ? <Spinner animation="border" className="spiner"/> 
              : <div>
                <div className="imgcss" >
                  <img src={img} alt="weather icon" />
                </div>
                
                <div>
                  <h2 className="">{data?.name},{data?.sys?.country}
                  <br/><span> {`${Math.floor(data?.main?.temp - 273.15)}°C`}</span>
                  </h2>
                  <h5>
                      {dateBuilder(new Date())}
                    </h5>
                      <h2>
                      {new Date(onecall.current?.dt * 1000).toLocaleDateString("en-GB", {
                                      hour24: true,
                                      hour: "numeric",
                                      minute: "2-digit",
                                  }).split(',')[1]}
                      </h2>
                  
                  <p>
                  {data?.weather?.[0].description}
                  <br/>
                  {onecall.current?.weather[0].main} {`${onecall.current?.clouds}%`}
                  </p>
                </div>
                <div className="img-box">
                        <div className="position-absolute">
                          <div className="fs-3 fw-bold text-white">{data?.name}</div>
                        </div>
                      <div className="image">
                          {`${Math.floor(data?.main?.temp - 273.15)}` > 20
                          ? <img src="https://c.wallhere.com/images/b4/4c/082581ac7cb231781c60cce48b28-1571321.jpg!d" alt="warm"/>
                          : <img src="https://media.idownloadblog.com/wp-content/uploads/2017/02/alex-muench-minimalist-ice-landscae-wallpaper-5120x2880.png" alt="cold"/>}  
                      </div>
                </div>
            </div>
              } 
            
            
        </Form>
          
           
            
          
          
            
        </Col>
    )
}
