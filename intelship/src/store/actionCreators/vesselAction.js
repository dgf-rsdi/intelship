import { FETCH_VESSEL, FETCH_VESSELS, LOADING_VESSEL, FETCH_VESSELS_INFO, FETCH_VESSELS_CLIENT } from "../actionTypes";
import axios from "axios";
// const BASE_URL = "http://localhost3001/";
const BASE_URL = "https://jst-intelship.com/";

export const fetchVessels = () => {
  return async (dispatch) => {
    const data = await axios.get(BASE_URL + "vessel");
    dispatch({ type: FETCH_VESSELS, payload: data.data });
  };
};

export const fetchVesselsClient = (companyName) => {
  return async (dispatch) => {
    // let companyName = localStorage.getItem("companyName")
    console.log(companyName)
    const data = await axios.post(`${BASE_URL}vessel/client`,
      {
      data: {
        companyName: companyName,
      },
    });
    // return axios.post(`${BASE_URL}vessel`, payload);
    dispatch({ type: FETCH_VESSELS_CLIENT, payload: data.data });
  };
};

// export function fetchVesselsClient(companyName) {
//   return (dispatch) => {
//     return new Promise((resolve, reject) => {
//       fetch(`${BASE_URL}vessel/client`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(companyName),
//       })
//         .then((resp) => {
//           if (!resp.ok) {
//             return resp.text().then((text) => {
//               throw new Error(JSON.parse(text).message);
//             });
//           } else {
//             dispatch({ type: FETCH_VESSELS_CLIENT, payload: data.data });
//             return resp.json();
//           }
//         })
//         .catch((err) => {
//           console.log(err)
//           reject(err);
//         });
//     });
//   };
// }

export const fetchVesselById = (id) => {
  return async (dispatch) => {
    // console.log(id)
    const data = await axios.get(BASE_URL + "vessel/" + id);
    // console.log(data)
    dispatch({ type: FETCH_VESSEL, payload: data.data });
  };
};

export function deleteVesselById(id) {
  console.log(id);
  return (dispatch) => {
    axios.delete(BASE_URL + "vessel/" + id)
      .then(() => {
        dispatch(fetchVessels());
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
    type: LOADING_VESSEL,
    payload,
  };
}

export const addVesselAction = (payload) => {
  return (dispatch) => {
    return axios.post(`${BASE_URL}vessel`, payload);
  };
};

export const editVesselAction = (payload, id) => {
  console.log(payload, id)
  return (dispatch) => {
    return axios.put(`${BASE_URL}vessel/${id}`, payload);
  };
};

export const fetchVesselsInfo = () => {
  return async (dispatch) => {
    const data = await axios.get(BASE_URL + "vessel/info");
    dispatch({ type: FETCH_VESSELS_INFO, payload: data.data });
  };
};