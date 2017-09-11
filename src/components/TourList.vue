<template>
    <div>
        <page-header></page-header>

        <div class="container">
            <error></error>

            <h2>Schedule</h2>

            <div class="pod-container tours">
        		<div class="pod tour" v-for="tour in store.tours">
        			<h3>{{ tour.name }}</h3>
        			<time>{{ tour.startTime }} - {{ tour.endTime }}</time>

                    <tour-bookings :tour="tour"></tour-bookings>
        		</div>
    		</div>
		</div>
    </div>
</template>

<script>
import PageHeader from './PageHeader.vue';
import Error from './Error.vue';
import TourBookings from './Bookings.vue';
import store from '../store/store.js';

export default {
    components: {
        PageHeader,
        Error,
        TourBookings
    },
    data() {
        return {
            store: store.state
        }
    },
    created() {
        store.getTours();
        store.getBookings();
    }
}
</script>
