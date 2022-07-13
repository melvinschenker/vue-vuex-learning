import debounce from "lodash.debounce";
import { searchLocations } from "./LocationSearch/actions";
import { setLocationsLoadingStatus, addLocationsToState } from "./LocationSearch/mutations";

export const LOCATIONS_URL = 'https://transport.opendata.ch/v1/locations';

export const state = {
  locations: [],
  locationsLoading: false,
};

const mutations = {
  addLocationsToState,
  setLocationsLoadingStatus
};

const actions = {
  searchLocations: debounce(searchLocations, 400)
};

const getters = {
  getLocations: (state) => () => {
    return state.locations;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}