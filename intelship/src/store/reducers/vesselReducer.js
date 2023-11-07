import { FETCH_VESSELS, LOADING_VESSEL, FETCH_VESSEL, FETCH_VESSELS_INFO, FETCH_VESSELS_CLIENT } from '../actionTypes'

const initialState = {
  vessels: [],
  vessel: {},
  vesselInfo: [],
  isLoading: false,
  vesselsClient: [],
  vesselDetail: []
}

function vesselReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FETCH_VESSELS:
      return { ...state, vessels: payload }
    case FETCH_VESSELS_CLIENT:
      return { ...state, vesselsClient: payload }
      case LOADING_VESSEL:
        return { ...state, isLoading: payload }
        case FETCH_VESSEL:
      // console.log("<<masuk reducer");
      return { ...state, vessel: payload, vesselDetail: payload.VesselInfos }
    case FETCH_VESSELS_INFO:
      return { ...state, vesselInfo: payload }
    default:
      return state
  }
}

export default vesselReducer
