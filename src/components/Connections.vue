<template>
	<div class="container">
		<h4> Connections </h4>
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
					<tr v-for="obj, index in connections" :key="index">
						<td>
							{{ new Date(obj.connectionDeparture).getHours()
									+ ":" +
									padTo2Digits(new Date(obj.connectionDeparture).getMinutes())
							}}
						</td>
						<td>
							{{ new Date(obj.connectionArrival).getHours()
									+ ":" +
									padTo2Digits(new Date(obj.connectionArrival).getMinutes())
							}}
						</td>
						<td>{{ obj.connectionDuration }}</td>
						<td>{{ obj.connectionJourney }}</td>
						<td>{{ obj.connectionPlatform }}</td>
					</tr>
				</tbody>
			</table>
			<div class="row justify-content-between">
				<div class="col-4">
					<button @click="searchEarlierConnections(connections[0])" class="btn btn-primary">
						Earlier Connections</button>
				</div>
				<div class="col-4">
					<button @click="searchLaterConnections(connections[connections.length - 1])" class="btn btn-primary">
						Later Connections</button>
				</div>
			</div>
		</div>
		<div v-if="connectionsLoading" class="progress">
			<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
				style="width: 100%"></div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"

export default {
	computed: {
		...mapState(["connections", "connectionsLoading"]),
		...mapGetters(["getConnections"])
	},
	methods: {
		padTo2Digits(num) {
			return String(num).padStart(2, '0');
		},
		...mapActions(["searchEarlierConnections", "searchLaterConnections"]),
	}
}
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
	margin: 1rem
}

.bold {
	font-weight: 900;
}
</style>