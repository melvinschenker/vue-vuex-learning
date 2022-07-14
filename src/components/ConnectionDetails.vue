<template>
  <tr
    v-bind:id="'connections_detail_' + connectionIndex"
    class="connections_detail"
  >
    <td colspan="5">
      <div class="card-group">
        <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ section.departureTime }},</h5>
              <p class="card-text">
                {{ section.departureStation }}
                {{
                  section.departurePlatform &&
                    "- Platform " + section.departurePlatform
                }}
              </p>

              <h5>{{ section.arrivalTime }},</h5>
              <p class="card-text">
                {{ section.arrivalStation }}
                {{
                  section.arrivalPlatform &&
                    "- Platform " + section.arrivalPlatform
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["sections", "connectionIndex"],
};
</script>
