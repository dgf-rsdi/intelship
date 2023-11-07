import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from 'next/navigation';

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT"
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user
          }
        : {
            isLoading: false
          })
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: state => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = localStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      // let userId = localStorage.getItem("id")
      // let userName = localStorage.getItem("fullname")
      const user = {
        // id: userId,
        avatar: "/assets/avatars/avatar-anika-visser.png",
        // name: userName,
        // email: "anika.visser@devias.io"
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem("authenticated", "true");
    } catch (err) {
      console.error(err);
    }

    const user = {
      // id: userId,
      avatar: "/assets/avatars/avatar-anika-visser.png",
      // name: userName,
      email: "anika.visser@devias.io"
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const router = useRouter();
  const signIn = (email, password) => {
    // if (email !== 'demo@devias.io' || password !== 'Password123!') {
    //   throw new Error('Please check your email and password');
    // }
    return new Promise((resolve, reject) => {
      console.log(email, password);
      const payload = {
        email,
        password
      };
      fetch(`https://jst-intelship.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(resp => {
          if (!resp.ok) {
            return resp.text().then(text => {
              throw new Error(JSON.parse(text).message);
            });
          } else {
            return resp.json();
          }
        })
        .then(data => {
          window.sessionStorage.setItem("authenticated", "true");
          window.sessionStorage.setItem("access_token", data.access_token);
          window.sessionStorage.setItem("companyName", data.companyName);
          window.sessionStorage.setItem("email", data.payload.email);
          window.sessionStorage.setItem("fullname", data.payload.fullname);
          resolve("Login success");
          router.push('/');
        })
        .catch(err => {
          reject(err);
        });
    });
    // await fetch(`http://34.101.124.53:3000/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(email, password),
    // })
    // try {
    //   window.sessionStorage.setItem('authenticated', 'true');
    //   window.sessionStorage.setItem("access_token", data.access_token);
    //   window.sessionStorage.setItem("email", email);
    // } catch (err) {
    //   console.error(err);
    // }

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Anika Visser",
      email: "anika.visser@devias.io"
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (email, name, password) => {
    throw new Error("Sign up is not implemented");
  };

  const signOut = () => {
    sessionStorage.clear()
    localStorage.clear()
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
