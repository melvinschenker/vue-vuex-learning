import get from 'lodash.get';
import moment from 'moment';

function formatDuration(timeString = '') {
  const noDaysString = timeString.slice(4);
  const hours = moment(noDaysString, 'hh:mm:ss').hours();
  const minutes = moment(noDaysString, 'hh:mm:ss').minutes();

  if (hours === 0) return `${minutes} min`

  return `${hours} h ${minutes} min`
}

export function addConnectionToState(state, payload) {
  const mappedConnections = payload.data.connections && payload.data.connections.map((connection) => {
    const departure = get(connection, 'from.departure');
    const arrival = get(connection, 'to.arrival');
    const duration = formatDuration(get(connection, 'duration'));
    const journey = get(connection, 'products[0]');
    const platform = get(connection, 'from.platform');
    const sections = get(connection, 'sections');

    return ({
      departure,
      arrival,
      duration,
      journey,
      platform,
      sections
    })
  })
  state.searchQuery = payload.query;
  state.connections = mappedConnections;
  state.connectionsLoading = false
}

export function setConnectionsLoadingStatus(state) {
  state.connectionsLoading = true
}

