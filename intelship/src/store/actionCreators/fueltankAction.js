import { FETCH_FUELTANKS, FETCH_FUELTANK, LOADING_FUELTANK } from "../actionTypes";
import axios from "axios";
const BASE_URL = "https://jst-intelship.com/";
// const BASE_URL = "http://localhost3001/";

export const fetchFueltank = () => {
  return async (dispatch) => {
    const data = await axios.get(BASE_URL + "fueltank");
    dispatch({ type: FETCH_FUELTANKS, payload: data.data });
  };
};

export const fetchFueltankById = (id) => {
  return async (dispatch) => {
    const data = await axios.get(BASE_URL + "fueltank/" + id);
    dispatch({ type: FETCH_FUELTANK, payload: data.data });
  };
};

export function deleteFueltankById(id) {
  // console.log(id);
  return (dispatch) => {
    axios.delete(BASE_URL + "fueltank/" + id)
      .then(() => {
        dispatch(fetchFueltank());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export function setLoading(payload) {
  return {
    type: LOADING_FUELTANK,
    payload,
  };
}

export const addFueltankAction = (payload) => {
  return (dispatch) => {
    return axios.post(`${BASE_URL}fueltank`, payload);
  };
};

export const editFueltankAction = (payload, id) => {
  console.log(payload, id)
  return (dispatch) => {
    return axios.put(`${BASE_URL}fueltank/${id}`, payload);
  };
};