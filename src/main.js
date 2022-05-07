import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from "vuex";
import axios from "axios";
import get from 'lodash.get';

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import moment from 'moment';

const store = createStore({
  state() {
    return {
      connections: []
    }
  },
  mutations: {
    addConnectionToState(state, payload) {
      const mappedConnections = payload.connections && payload.connections.map((connection) => {
        const connectionDeparture = get(connection, 'sections[0].departure.departure');
        const connectionArrival = get(connection, 'sections[0].arrival.arrival');
        const connectionJourney = get(connection, 'sections[0].journey.category');
        const connectionPlatform = get(connection, 'sections[0].departure.platform');

        return ({
          connectionDeparture,
          connectionArrival,
          connectionJourney,
          connectionPlatform
        })
      })
      state.connections = mappedConnections;
    }
  },
  actions: {
    async searchConnections(context, payload) {
      let dateTime = payload.departure
      let date = moment(dateTime).format('YYYY-MM-DD')
      let time = moment(dateTime).format('LT')
      let data = await axios.get(`http://transport.opendata.ch/v1/connections?from=${payload.from}&to=${payload.to}&date=${date}&time=${time}&limit=10`)
      context.commit('addConnectionToState', data.data)
    }
  },
  getters: {
    getConnections: (state) => () => {
      return state.connections;
    }
  }
})

const app = createApp(App)

app.use(store)

app.mount('#app')