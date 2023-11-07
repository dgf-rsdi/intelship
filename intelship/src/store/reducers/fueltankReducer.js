import { FETCH_FUELTANK, LOADING_FUELTANK, FETCH_FUELTANKS } from '../actionTypes'

const initialState = {
  fueltanks: [],
  fueltank: {},
  isLoading: true,
}

function fueltankReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FUELTANKS:
      return {
        ...state,
        fueltanks: action.payload,
      }
    case FETCH_FUELTANK:
      return {
        ...state,
        fueltank: action.payload,
      }
    case LOADING_FUELTANK:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export default fueltankReducer
