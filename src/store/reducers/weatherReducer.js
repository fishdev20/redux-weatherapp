import { GET_WEATHER, SET_ERROR } from '../types';

const initialState = {
  data: null,
  
  error: '',
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        data: action.payload,
        error: '',
      };
    case SET_ERROR:
      return {
        ...state,
        error: 'City not found! Please, try again.',
      };
    default:
      return state;
  }
};
 
export default weatherReducer;