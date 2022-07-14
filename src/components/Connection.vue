<template>
  <tr @click="showDetails(`connections_detail_${connectionIndex}`)">
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
</template>

<script>
export default {
  props: ["connection", "connectionIndex"],
  methods: {
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
};
</script>
