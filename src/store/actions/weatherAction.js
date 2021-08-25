import { GET_WEATHER, SET_ERROR } from '../types';
import {API_KEY, API_BASE_URL} from '../../Components/Api';


 export const getWeather = (city) => {
  return async dispatch => {
    try  {
      const res = await fetch(`${API_BASE_URL}data/2.5/weather?q=${city}&appid=${API_KEY}`);

      if (!res.ok) {
        const resData = await res.json();
        throw new Error(resData.message);
      }

      const resData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData,
        
      });
     
    } 
    catch (err) {
      dispatch(setError(err));
      
    }
  };
};



 const setError = (err) => {
  return {
    type: SET_ERROR,
    payload: err,
  };
};

