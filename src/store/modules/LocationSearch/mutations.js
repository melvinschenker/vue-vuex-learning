import get from 'lodash.get';

export function addLocationsToState(state, payload) {
  const mappedLocations = payload.data.stations && payload.data.stations.map((station) => {
    const name = get(station, 'name');
    const id = get(station, 'id');
    const icon = get(station, 'icon');

    return ({
      name,
      id,
      icon
    })
  })

  state.locations = mappedLocations;
  state.locationsLoading = false
}

export function setLocationsLoadingStatus(state) {
  state.locationsLoading = true
}