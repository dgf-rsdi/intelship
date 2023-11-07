import { FETCH_COMPANIES, LOADING_COMPANY, FETCH_COMPANY } from "../actionTypes";
import axios from "axios";
const BASE_URL = "https://jst-intelship.com/master/";
import Swal from "sweetalert2";

export const fetchCompany = () => {
  return async dispatch => {
    const data = await axios.get(BASE_URL + "company");
    dispatch({ type: FETCH_COMPANIES, payload: data.data });
  };
};

export const fetchCompanyById = (id) => {
  return async dispatch => {
    const data = await axios.get(BASE_URL + "company/" + id);
    dispatch({ type: FETCH_COMPANY, payload: data.data });
  };
};

export function deleteCompanyById(id) {
  // console.log(id);
  return dispatch => {
    axios
      .delete(BASE_URL + "company/" + id)
      .then(() => {
        dispatch(fetchCompany());
        Swal.fire({
          icon: "success",
          iconColor: "#57240f",
          title: "Delete Success!",
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831",
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: "error",
          iconColor: "#57240f",
          title: "Error!",
          text: err.response.data.message,
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831",
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

export const addCompanyAction = payload => {
  return dispatch => {
    return axios.post(`${BASE_URL}company`, payload);
  };
};

export const editCompanyAction = (company, id) => {
  // console.log(company, id);
  return dispatch => {
    return axios.put(`${BASE_URL}company/${id}`, company);
  };
};

export function setLoading(payload) {
  return {
    type: LOADING_COMPANY,
    payload
  };
}
