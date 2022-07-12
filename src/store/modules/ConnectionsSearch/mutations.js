import get from 'lodash.get';

export function addConnectionToState(state, payload) {
  const mappedConnections = payload.data.connections && payload.data.connections.map((connection) => {
    const departure = get(connection, 'from.departure');
    const arrival = get(connection, 'to.arrival');
    const duration = get(connection, 'duration').slice(3);
    const journey = get(connection, 'sections[0].journey.category');
    const platform = get(connection, 'sections[0].departure.platform');

    return ({
      departure,
      arrival,
      duration,
      journey,
      platform
    })
  })
  state.searchQuery = payload.query;
  state.connections = mappedConnections;
  state.connectionsLoading = false
}

export function setConnectionsLoadingStatus(state) {
  state.connectionsLoading = true
}

