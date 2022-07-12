import { addConnectionToState, setConnectionsLoadingStatus } from './ConnectionsSearch/mutations'
import { searchConnections, searchEarlierConnections, searchLaterConnections } from './ConnectionsSearch/actions'

export const CONNECTIONS_URL = 'http://transport.opendata.ch/v1/connections';

export const state = {
  connections: [],
  connectionsLoading: false,
  searchQuery: {}
};

const mutations = {
  addConnectionToState,
  setConnectionsLoadingStatus,
};

const actions = {
  searchConnections,
  searchEarlierConnections,
  searchLaterConnections,
};

const getters = {
  getConnections: (state) => () => {
    return state.connections;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}