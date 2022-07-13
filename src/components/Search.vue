<template>
  <div class="container">
    <h1>Transportation Planer</h1>

    <input type="datetime-local" v-model="departure" id="departure" />

    <datalist id="from">
      <option v-for="(location, index) in locations" :key="index">
        {{ location.name }}
      </option>
    </datalist>
    <input
      autoComplete="on"
      list="from"
      v-model="from"
      v-on:input="(e) => searchLocations({ locationInput: e.target.value })"
    />

    <datalist id="to">
      <option v-for="(location, index) in locations" :key="index">
        {{ location.name }}
      </option>
    </datalist>
    <input
      autoComplete="on"
      list="to"
      v-model="to"
      v-on:input="(e) => searchLocations({ locationInput: e.target.value })"
    />

    <div>
      <button class="btn" @click="searchConnections({ departure, from, to })">
        Search Connections
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

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
      locations: (state) => state.locationSearch.locations,
    }),
    ...mapGetters({
      getLocations: "getLocations",
    }),
  },
  methods: {
    ...mapActions("connectionSearch", ["searchConnections"]),
    ...mapActions("locationSearch", ["searchLocations"]),
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
