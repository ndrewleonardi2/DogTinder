import { combineReducers } from 'redux';
import * as ACTIONS from './actions';

let user = (state = { data: {}, loading: true }, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_PROFILE:
      return { ...state, loading: true, error: null };
    case ACTIONS.GET_PROFILE_FAILURE:
      return { ...state, loading: false, error: payload };
    case ACTIONS.GET_PROFILE_SUCCESS:
      return { ...state, loading: false, data: payload };
    case ACTIONS.UPDATE_TYPE_PREFERENCE:
      return {
        ...state,
        data: {
          ageRange: {
            max: state.data.ageRange.max,
            min: state.data.ageRange.min,
          },
          profile: state.data.profile,
          id: state.data.id,
          typePreference: payload
        }
      }
    case ACTIONS.UPDATE_MAX_AGE:
      return {
        ...state,
        data: {
          ageRange: {
            max: Number(payload),
            min: state.data.ageRange.min,
          },
          profile: state.data.profile,
          id: state.data.id,
          typePreference: state.data.typePreference
        }
      }
    case ACTIONS.UPDATE_MIN_AGE:
      return {
        ...state,
        data: {
          ageRange: {
            max: state.data.ageRange.max,
            min: Number(payload)
          },
          profile: state.data.profile,
          id: state.data.id,
          typePreference: state.data.typePreference
        }
      }
    default:
      return state;
  }
};

let pets = (state = { data: [], loading: true }, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_PETS:
      return { ...state, loading: true, error: null };
    case ACTIONS.GET_PETS_FAILURE:
      return { ...state, loading: false, error: payload };
    case ACTIONS.GET_PETS_SUCCESS:
      return { ...state, loading: false, data: payload };
    default:
      return state;
  }
};

let saved = (state = [], { type, payload }) => {
  switch (type) {
    case ACTIONS.SAVE_PET:
      return [...state, payload];
    case ACTIONS.SAVE_PET_PREFERENCE_CHANGE:
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  user,
  pets,
  saved
});