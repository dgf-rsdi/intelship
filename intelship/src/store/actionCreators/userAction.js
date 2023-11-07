import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";

const baseUrl = "https://jst-intelship.com";
// const baseUrl = "http://localhost3001";

export function loginAction(values) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const payload = {
        email: values.email,
        password: values.password
      };
      fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      .then((resp) => {
        if (!resp.ok) {
          return resp.text().then((text) => {
            throw new Error(JSON.parse(text).message);
          });
        } else {
          return resp.json();
        }
      })
        .then((data) => {
          localStorage.setItem("authenticated", "true");
          localStorage.setItem("login", true);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("email", data.payload.email);
          localStorage.setItem("email", data.payload.id);
          localStorage.setItem("fullname", data.payload.fullname);
          localStorage.setItem("companyName", data.payload.companyName);
          localStorage.setItem("role", data.payload.role);
          dispatch(userLogin());
          resolve("Login success");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}


export function registerUser(payload) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((resp) => {
          if (!resp.ok) {
            return resp.text().then((text) => {
              throw new Error(JSON.parse(text).message);
            });
          } else {
            return resp.json();
          }
        })
        .then((data) => {
          resolve("Register success");
        })
        .catch((err) => {
          console.log(err)
          reject(err);
        });
    });
  };
}

export function userLogin() {
  return {
    type: USER_LOGIN,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}