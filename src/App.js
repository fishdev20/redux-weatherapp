
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container,Row,Alert, Spinner } from 'react-bootstrap';
import Hour from './Components/Hour';
import Week from './Components/Week';
import Today from './Components/Today';
import React, { useEffect, useState } from "react";
import {API_KEY, API_BASE_URL} from './Components/Api';
import SearchWeather from './Components/SearchWeather';


import { useDispatch, useSelector } from 'react-redux';
import { getWeather } from './store/actions/weatherAction';



let init = true;
  const App = () => {

    const dispatch = useDispatch();
    const { data, error } = useSelector(state => state.weather);

    const [typecity, setTypecity] = useState("");
    const[onecall,setOnecall] = useState("");


    useEffect(()=>{
      if(init){
        dispatch(getWeather('Haiphong'));
        init = false
      }
    },[dispatch]);

    const searchCity =(event) => {
      if (event.key === 'Enter') {
        if (typecity === '') {
          <Alert className="alert alert-danger" role="alert">
            {error}
          </Alert>
          
        }
        
          dispatch(getWeather(typecity));
          setTypecity('');
          event.preventDefault();
          event.stopPropagation();
        
        
      }  
    };
      useEffect(()=>{
        if(data?.coord){
                let {lat,lon} = data.coord;
              fetch( `${API_BASE_URL}data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
              .then(res => res.json())
              .then(weather => {
                setOnecall(weather)
                  
              })
              .catch(function (error) {
                console.log(error);
              });
            };
      },[data?.coord])
    // useEffect(() => {
    //   fetch(`${API_BASE_URL}data/2.5/weather?q=${city}&appid=${API_KEY}`)
    //   .then(res => res.json())
    //   .then((data) => {
    //     setValue(data);
    //     setimg(`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
    //     setCoord(data.coord)
    //     console.log(data);
    //     console.log('render');
    //   }) 
    //   .catch(function (error) {
    //     console.log('error');
    //   }); 
    // }, [city]);

    // useEffect(() => {
    //   if(coord){
    //    let {lat,lon} = coord;
    //   fetch( `${API_BASE_URL}data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    //   .then(res => res.json())
    //   .then(onecall => {
    //     setOnecall(onecall)
    //     console.log(onecall);
    //   })
    //   .catch(function (error) {
    //     console.log('this is not error :D');
    //   });
    // };
    // }, [coord]);

  const [tabs, setTabs] = useState([
    {
      index: 0,
      name: 'Today',
      status: true
    },
    {
      index: 1,
      name: 'Week',
      status: false
    },
    {
      index: 2,
      name: 'Hour',
      status: false
    },

  ])

  const handleChangeTab = (el) => {
    setTabs(tabs.map(item => item.index === el.index ? { ...item, status: true } : { ...item, status: false }))
  }
 
  return (
    <Container className="App">
      <Row>
        <SearchWeather 
          searchCity={searchCity}
          onecall={onecall}
          error={error}
          typecity={typecity}
          setTypecity={setTypecity} 
          data={data} 
        />
        <Col lg={9} md={8} sm={12} className="weather-info" >
        {!data 
              ? <Spinner animation="border" className="load"/> 
              : (
                
                  
                  <div className="info-container">
                    {error !== "" &&
                    <Alert className="alert alert-danger" role="alert">
                      {error}
                    </Alert>
                    }
                    <div className="navbar">
                          <ul className="nav">
                            {tabs.map((el, index) =>
                              <li 
                                key={index} 
                                role="button" 
                                className={`${el.status ? 'tabs active-tabs' : 'tabs'}`} 
                                onClick={() => handleChangeTab(el)}
                              >
                                {el.name}
                              </li>
                            )}
                          </ul>
                          <img  src="https://cdn-www.bluestacks.com/bs-images/0c4ca69b0c81f701b46afbfdc0670f44.png" alt="avatar" width='50' />
                        </div>
                    <div>
                      {tabs.map((el, index) =>
                              el.status === true && el.name === 'Today' ? 
                                <Today 
                                  key={index}  
                                  onecall={onecall}
                                  
                                />
                              : el.status === true && el.name === 'Week' ? 
                                <Week 
                                  key={index} 
                                  onecall={onecall}
                                />
                              : el.status === true && el.name === 'Hour' ?
                                <Hour 
                                  key={index}
                                  onecall={onecall}
                                />
                              : ""
                        )}
                    </div>
                  </div>
                
            
              )}
        </Col> 
    </Row>
    </Container>
  );
}

export default App;
