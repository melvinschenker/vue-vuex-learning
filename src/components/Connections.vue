<template>
  <div class="container">
    <h4>Connections</h4>
    <div v-if="connections.length > 0 && !connectionsLoading">
      <table class="table">
        <thead>
          <tr>
            <td>Departure</td>
            <td>Arrival</td>
            <td>Duration</td>
            <td>Journey</td>
            <td>Platform</td>
          </tr>
        </thead>
        <tbody>
          <template v-for="(connection, index) in connections" :key="index">
            <tr @click="showDetails(`connections_detail_${index}`)">
              <td>
                {{
                  new Date(connection.departure).getHours() +
                    ":" +
                    padTo2Digits(new Date(connection.departure).getMinutes())
                }}
              </td>
              <td>
                {{
                  new Date(connection.arrival).getHours() +
                    ":" +
                    padTo2Digits(new Date(connection.arrival).getMinutes())
                }}
              </td>
              <td>{{ connection.duration }}</td>
              <td>{{ connection.journey }}</td>
              <td>{{ connection.platform }}</td>
            </tr>

            <ConnectionDetails
              v-bind:sections="connection.sections"
              v-bind:connectionIndex="index"
            />
          </template>
        </tbody>
      </table>
      <div class="row justify-content-between">
        <div class="col-4">
          <button
            @click="searchEarlierConnections(connections[0])"
            class="btn btn-primary"
          >
            Earlier Connections
          </button>
        </div>
        <div class="col-4">
          <button
            @click="searchLaterConnections(connections[3])"
            class="btn btn-primary"
          >
            Later Connections
          </button>
        </div>
      </div>
    </div>
    <div v-if="connectionsLoading" class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="100"
        style="width: 100%"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import ConnectionDetails from "./ConnectionDetails.vue";

export default {
  computed: {
    ...mapState({
      connections: (state) => state.connectionSearch.connections,
      connectionsLoading: (state) => state.connectionSearch.connectionsLoading,
    }),
    ...mapGetters({
      getConnections: "getConnections",
    }),
  },
  methods: {
    ...mapActions("connectionSearch", [
      "searchEarlierConnections",
      "searchLaterConnections",
    ]),
    padTo2Digits(num) {
      return String(num).padStart(2, "0");
    },
    showDetails(connectionId) {
      const connectionDetail = document.getElementById(connectionId);
      if (connectionDetail.style.display === "table-row") {
        connectionDetail.style.display = "none";
      } else {
        connectionDetail.style.display = "table-row";
      }
    },
  },
  components: {
    ConnectionDetails,
  },
};
</script>

<style scoped>
.container {
  margin-top: 2rem;
}

.flex {
  display: flex;
  text-align: center;
  width: 25rem;
  margin: 0 auto;
  justify-content: space-between;
  flex-wrap: wrap;
}

.flex p {
  margin: 1rem;
}

.bold {
  font-weight: 900;
}
.connections_detail {
  display: none;
}
</style>
