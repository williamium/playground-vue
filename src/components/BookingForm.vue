<template>
    <div>
        <page-header></page-header>

        <div class="container">
            <error></error>

            <h2>New Booking</h2>

            <form class="pod-container booking-form" method="post" v-on:submit.prevent="createBooking">
        		<div class="pod tour-details">
        			<h3>Tour Details</h3>
                    <div class="pod-content">
                        <label for="tour">Tour</label>
                        <select name="tour" id="tour" v-model="booking.tour">
                            <option value=""></option>
                            <option v-for="tour in store.tours" :value="tour.id">{{ tour.name }}</option>
                        </select>
                    </div>
        		</div>

        		<div class="pod customer-details">
        			<h3>Customer Details</h3>
                    <div class="pod-content" v-if="booking.tour && tourAvailability > 0">
                        <label for="firstname">Firstname</label>
                        <input type="text" name="firstname" id="firstname" v-model="booking.firstname">

                        <label for="surname">Surname</label>
                        <input type="text" name="surname" id="surname" v-model="booking.surname">

                        <label for="quantity">Quantity</label>
                        <select name="quantity" id="quantity" v-model="booking.qty">
                            <option v-for="n in tourAvailability" :value="n">{{ n }}</option>
                        </select>
                    </div>
                    <div class="pod-content" v-else-if="tourAvailability === 0">
                        <p>This tour has sold out.</p>
                    </div>
                    <div class="pod-content" v-else>
                        <p>Select a tour.</p>
                    </div>
                    <div class="pod-footer">
                        <button type="submit">Book</button>
                    </div>
        		</div>
    		</form>
		</div>
    </div>
</template>

<script>
import PageHeader from './PageHeader.vue';
import Error from './Error.vue';
import store from '../store/store.js';

export default {
    components: {
        PageHeader,
        Error
    },
    computed: {
        tourAvailability() {
			const tour = this.store.tours.find(tour => tour.id === this.booking.tour);
            const qtySold = this.store.bookings.filter(booking => booking.tourId === this.booking.tour && booking.status !== 4).reduce((total, booking) => total + booking.quantity, 0);

            return (tour) ? tour.capacity - qtySold : '';
        }
    },
    methods: {
        createBooking() {
            // Redirect back to the schedule if the booking was successful
            store.createBooking(this.booking).then((response) => (response) ? this.$router.push({ name: 'home' }) : '');
        }
    },
    watch: {
        '$route' (to, from) {
            // Fetch the data again
            store.getTours();
            store.getBookings();

            // Update the current tour
            this.booking.tour = this.$route.query.tour;
        }
    },
    data() {
        return {
            store: store.state,
            booking: {
                tour: this.$route.query.tour,
                firstname: '',
                surname: '',
                qty: 0
            }
        }
    },
    created() {
        store.getTours();
        store.getBookings();
    }
}
</script>

<style lang="scss">
@import "~susy/sass/susy";
@import '../css/_grid.scss';

.booking-form {
    label {
        display: block;
    }

    input + label {
        margin-top: 10px;
    }

    .customer-details {
        @include span(last 8);
    }
}
</style>
