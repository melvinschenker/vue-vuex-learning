import axios from "axios";
import get from 'lodash.get';
import moment from 'moment';

const CONNECTIONS_URL = 'http://transport.opendata.ch/v1/connections';

const state = {
  connections: [],
  connectionsLoading: false,
  searchQuery: {}
};

const mutations = {
  addConnectionToState(state, payload) {
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
    let data = await axios.get(`${CONNECTIONS_URL}?from=${payload.from}&to=${payload.to}&date=${date}&time=${time}&limit=6`)
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
  /**
   * Searches for the first 4 connections which are earlier than the earliest previous connection
   * and adds them at the top of the previous connections.
   * 
   * @param {Object} context Store of current module.
   * @param {Object} payload Earliest connections from previous connection list.
   * @return {void} Adds the new 4 connections, combined with the previous 6 connections to the modules state.
   */
  async searchEarlierConnections(context, payload) {
    context.commit('setConnectionsLoadingStatus')

    let newConnection = 0;
    let countIterations = 1;
    let data, query = {};

    while (newConnection < 4) {
      let earlierTime = moment(payload.departure).subtract(30 * countIterations, 'minutes').format('LT');

      query = {
        from: state.searchQuery.from,
        to: state.searchQuery.to,
        date: state.searchQuery.date,
        time: earlierTime,
      }

      data = await axios.get(`${CONNECTIONS_URL}?from=${query.from}&to=${query.to}&date=${query.date}&time=${query.time}&limit=10`)

      for (let i = 0; i < data.data.connections.length; i++) {
        if (data.data.connections[i].from.departure === state.connections[1].departure) break;
        newConnection++;
      }
      countIterations++;
    }

    data = {
      ...data,
      query
    }
    context.commit('addConnectionToState', data)
  },
  /**
 * Either searches 4 new/later connections and add them to the previous list. (fill to 10)
 * or just searches 6 later connections.
 * 
 * @param {Object} context Store of current module.
 * @param {Object} payload The forth connection from previous connection list.
 * @return {void} Adds the fetched connections to the modules state.
 */
  async searchLaterConnections(context, payload) {
    context.commit('setConnectionsLoadingStatus')

    let data = {};
    const query = {
      from: state.searchQuery.from,
      to: state.searchQuery.to,
      date: state.searchQuery.date,
      time: state.searchQuery.time,
    }

    if (state.connections.length <= 6) {
      data = await axios.get(`${CONNECTIONS_URL}?from=${query.from}&to=${query.to}&date=${query.date}&time=${query.time}&limit=10`)
    } else {
      data = await axios.get(`${CONNECTIONS_URL}?from=${query.from}&to=${query.to}&date=${query.date}&time=${payload.departure}&limit=10`)
    }

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