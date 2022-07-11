import { createStore, createLogger } from 'vuex'
import connectionSearch from './modules/connectionSearch'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    connectionSearch,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})