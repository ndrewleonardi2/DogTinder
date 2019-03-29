import * as ACTIONS from './actions';

let get_pets = () => {
  return {
    type: ACTIONS.GET_PETS
  }
};

let get_pets_failure = (error) => {
  return {
    type: ACTIONS.GET_PETS_FAILURE,
    payload: error
  }
};

let get_pets_success = (pets) => {
  return {
    type: ACTIONS.GET_PETS_SUCCESS,
    payload: pets
  }
};

let get_profile = () => {
  return {
    type: ACTIONS.GET_PROFILE
  }
};

let get_profile_failure = (error) => {
  return {
    type: ACTIONS.GET_PROFILE_FAILURE,
    payload: error
  }
};

let get_profile_success = (profile) => {
  return {
    type: ACTIONS.GET_PROFILE_SUCCESS,
    payload: profile
  }
};

let save_pet = (pet) => {
  return {
    type: ACTIONS.SAVE_PET,
    payload: pet
  }
};

let save_pet_preference_change = () => {
  return {
    type: ACTIONS.SAVE_PET_PREFERENCE_CHANGE
  }
};

let update_max_age = (max) => {
  return {
    type: ACTIONS.UPDATE_MAX_AGE,
    payload: max
  }
};

let update_min_age = (min) => {
  return {
    type: ACTIONS.UPDATE_MIN_AGE,
    payload: min
  }
};

let update_type_preference = (type) => {
  return {
    type: ACTIONS.UPDATE_TYPE_PREFERENCE,
    payload: type === true ? 'dog' : 'cat'
  }
};

export default {
  get_pets,
  get_pets_failure,
  get_pets_success,
  get_profile,
  get_profile_failure,
  get_profile_success,
  save_pet,
  save_pet_preference_change,
  update_max_age,
  update_min_age,
  update_type_preference
}