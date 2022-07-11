import axios from "axios";
import get from 'lodash.get';
import moment from 'moment';

const state = {
  connections: [],
  connectionsLoading: false,
  searchQuery: {}
};

const mutations = {
  addConnectionToState(state, payload) {
    const mappedConnections = payload.data.connections && payload.data.connections.map((connection) => {
      const connectionDeparture = get(connection, 'sections[0].departure.departure');
      const connectionArrival = get(connection, 'sections[0].arrival.arrival');
      const connectionDuration = get(connection, 'duration').slice(3);
      const connectionJourney = get(connection, 'sections[0].journey.category');
      const connectionPlatform = get(connection, 'sections[0].departure.platform');

      return ({
        connectionDeparture,
        connectionArrival,
        connectionDuration,
        connectionJourney,
        connectionPlatform
      })
    })
    state.searchQuery = payload.query;
    state.connections = mappedConnections;
    state.connectionsLoading = false
  },

  setConnectionsLoadingStatus(state) {
    state.connectionsLoading = true
  }
};

const actions = {
  async searchConnections(context, payload) {
    context.commit('setConnectionsLoadingStatus')
    let dateTime = payload.departure
    let date = moment(dateTime).format('YYYY-MM-DD')
    let time = moment(dateTime).format('LT')
    let data = await axios.get(`http://transport.opendata.ch/v1/connections?from=${payload.from}&to=${payload.to}&date=${date}&time=${time}&limit=6`)
    let query = {
      date,
      time,
      from: payload.from,
      to: payload.to,
    }
    data = {
      ...data,
      query
    }
    context.commit('addConnectionToState', data)
  },
  async searchEarlierConnections(context, payload) {
    context.commit('setConnectionsLoadingStatus')
    let laterTime = moment(payload.connectionDeparture).subtract(1, 'hour').format('LT');
    let query = {
      from: state.searchQuery.from,
      to: state.searchQuery.to,
      date: state.searchQuery.date,
      time: laterTime,
    }
    let data = await axios.get(`http://transport.opendata.ch/v1/connections?from=${query.from}&to=${query.to}&date=${query.date}&time=${query.time}&limit=6`)
    data = {
      ...data,
      query
    }
    context.commit('addConnectionToState', data)
  },
  async searchLaterConnections(context, payload) {
    context.commit('setConnectionsLoadingStatus')
    let laterTime = moment(payload.connectionDeparture).add(1, 'minute').format('LT');
    let query = {
      from: state.searchQuery.from,
      to: state.searchQuery.to,
      date: state.searchQuery.date,
      time: laterTime,
    }
    let data = await axios.get(`http://transport.opendata.ch/v1/connections?from=${query.from}&to=${query.to}&date=${query.date}&time=${query.time}&limit=6`)
    data = {
      ...data,
      query
    }
    context.commit('addConnectionToState', data)
  }
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