import axios from 'axios';

export default {
    debug: true,
    state: {
        tours: [],
        bookings: [],
        errorMessage: ''
    },
    handleError(error, message) {
        if (error.response) {
            // Response falls out of the range of 2xx
            this.state.errorMessage = (message) ? message : 'There was a problem handling this request.';
        } else if (error.request) {
            // No response received
            this.state.errorMessage = 'Could not reach the server.';
        }

        return false;
    },
    getTours() {
        axios.get('http://localhost:3000/tours').then((response) => {
            this.state.tours = response.data;
        }).catch(error => this.handleError(error, 'There was a problem loading tours.'));
    },
    getBookings() {
        axios.get('http://localhost:3000/bookings?_expand=user').then((response) => {
            this.state.bookings = response.data;
        }).catch(error => this.handleError(error, 'There was a problem loading bookings.'));
    },
    setStatus(booking, newStatus) {
        const originalStatus = booking.status;

        // Toggle the status on or off
        this.state.bookings.find(storeBooking => storeBooking.id === booking.id).status = (booking.status === newStatus) ? 1 : newStatus;

        axios.patch('http://localhost:3000/bookings/'+booking.id, {
            status: booking.status
        }).catch((error) => {
            // There was an error so revert the status
            this.state.bookings.find(storeBooking => storeBooking.id === booking.id).status = originalStatus;

            this.handleError(error, 'There was a problem changing the booking status.');
        });
    },
    createUser(firstname, surname) {
        return axios.post('http://localhost:3000/users', {
            firstname,
            surname
        });
    },
    createBooking(booking) {
        return this.createUser(booking.firstname, booking.surname).then((response) => {
            return axios.post('http://localhost:3000/bookings', {
                tourId: booking.tour,
                userId: response.data.id,
                quantity: booking.qty,
                status: 1
            });
        }).then(response => true).catch(error => this.handleError(error, 'There was a problem creating the booking.'));
    }
}