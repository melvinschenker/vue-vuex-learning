import axios from "axios";

import { LOCATIONS_URL } from "../locationSearch";

export async function searchLocations(context, payload) {

  context.commit('setLocationsLoadingStatus')
  
  let data = await axios.get(`${LOCATIONS_URL}?query=${payload.locationInput}`)

  context.commit('addLocationsToState', data)
}
