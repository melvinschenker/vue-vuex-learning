<template>
  <div class="container">
    <h1>Transportation Planer</h1>
    <input type="datetime-local" v-model="departure" id="departure" />
    <input type="text" v-model="from" />
    <input type="text" v-model="to" />
    <div>
      <button class="btn" @click="searchConnections({ departure, from, to })">
        Search Connections
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      departure: new Date(),
      from: "",
      to: "",
    };
  },
  computed: {
    ...mapState({
      connections: (state) => state.connectionSearch.connections,
    }),
  },
  methods: {
    ...mapActions("connectionSearch", ["searchConnections"]),
  },
  mounted() {
    console.log("Store mounted: \n", this.$store.state);
  },
};
</script>

<style scoped>
.container {
  margin-top: 1rem;
}

button {
  border-radius: 100%;
  border: none;
  width: 2rem;
  height: 2rem;
  font-weight: 700;
  cursor: pointer;
}

input {
  padding: 0.4rem;
  margin: 0 0.5rem;
  text-align: center;
}

.btn {
  border-radius: 0.5rem;
  width: auto;
  background: #d1443f;
  margin-top: 1rem;
  color: white;
  cursor: pointer;
}
</style>
