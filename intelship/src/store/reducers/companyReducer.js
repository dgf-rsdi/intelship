import { FETCH_COMPANIES, LOADING_COMPANY, FETCH_COMPANY } from "../actionTypes";

const initialState = {
  companies: [],
  company: {}
};

function companyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPANIES:
      return { ...state, companies: action.payload };
    case LOADING_COMPANY:
      return { ...state, isLoading: action.payload };
      case FETCH_COMPANY:
      return { ...state, company: action.payload };
    default:
      return state;
  }
}

export default companyReducer;
