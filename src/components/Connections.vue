<template>
	<div class="container">
		<h4> Connections </h4>
		<table class="table">
			<thead>
				<tr>
					<td>Departure</td>
					<td>Arrival</td>
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
					<td>{{ obj.connectionJourney }}</td>
					<td>{{ obj.connectionPlatform }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex"

export default {
	computed: {
		...mapState(["connections"]),
		...mapGetters(["getConnections"])
	},
	methods: {
		padTo2Digits(num) {
			return String(num).padStart(2, '0');
		}
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