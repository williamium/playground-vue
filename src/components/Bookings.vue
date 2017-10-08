<template>
	<div>
		<ul>
			<template v-if="tourBookings.length > 0">
				<li :class="{ 'checked-in': booking.status === 2, 'no-show': booking.status === 3, cancelled: booking.status === 4 }" v-for="booking in tourBookings">
					<div class="summary">
						<span class="name">{{ booking.user.firstname }} {{ booking.user.surname }}</span>
						<span class="quantity">{{ booking.quantity }}</span>
						<button type="button" :class="{ open: activeTourBooking === booking.id }" @click="toggleActions(booking)">Open</button>
					</div>
					<div class="actions" v-show="activeTourBooking === booking.id">
						<button type="button" class="check-in" @click="setStatus(booking, 2)">Check In</button>
						<button type="button" class="no-show" @click="setStatus(booking, 3)">No Show</button>
						<button type="button" class="cancel" @click="setStatus(booking, 4)">Cancel</button>
					</div>
				</li>
			</template>
			<li v-else>
				<div class="summary">
					<span class="name">No bookings</span>
				</div>
			</li>
		</ul>

		<div class="pod-footer tour-summary">
			<span>
				Sold: {{ quantitySold }}/{{ tour.capacity }}
			</span>
			<router-link :to="{ name: 'book', query: { tour: tour.id }}" class="button">Quick Book</router-link>
		</div>
	</div>
</template>

<script>
import store from '../store/store.js';

export default {
    props: ['tour'],
    computed: {
        tourBookings() {
            return this.store.bookings.filter(booking => booking.tourId === this.tour.id);
        },
        quantitySold() {
            return this.store.bookings.filter(booking => booking.tourId === this.tour.id && booking.status !== 4).reduce((total, booking) => total + booking.quantity, 0);
        }
    },
    data() {
        return {
            store: store.state,
			activeTourBooking: 0
        }
    },
	methods: {
		toggleActions(booking) {
			if(this.activeTourBooking && booking.id === this.activeTourBooking) {
				this.activeTourBooking = 0;
			} else {
				this.activeTourBooking = booking.id;
			}
		},
		setStatus(booking, newStatus) {
			store.setStatus(booking, newStatus);
		}
	}
}
</script>

<style lang="scss">
@import "~susy/sass/susy";
@import '../css/_grid.scss';
@import '../css/_helpers.scss';

.tour {
	ul {
		list-style: none;
		margin: 0;
	    padding: 0;
	    text-transform: uppercase;
	    height: 350px;
	    overflow-y: scroll;
	}

	li {
		background: $secondaryBgColour;
		border-left: 5px solid $tertiaryBgColour;
	    border-bottom: 1px solid $tertiaryBgColour;
	    overflow: hidden;

		&.checked-in {
			border-left-color: #04C0DD;
		}

		&.no-show {
			border-left-color: #FA0505;
		}

		&.cancelled {
			border-left-color: $primaryBgColour;
		}
	}

	.summary {
        overflow: hidden;

        span {
            float: left;
            box-sizing: border-box;

            &.name {
                width: 70%;
                padding: 12px 10px;
				font-size: convert(13);
                @include ellipsis();
            }

            &.quantity {
				font-size: convert(17);
                text-align: center;
                line-height: 40px;
                padding: 0 10px;
                width: 15%;
                border-left: 1px solid $tertiaryBgColour;
                border-right: 1px solid $tertiaryBgColour;
            }
        }

        button {
            position: relative;
            float: left;
            width: 15%;
            height: 40px;
			background: none;
            @include hide-text();

            &::after, &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 14px;
                height: 3px;
                background: #000;
                margin-left: -7px;
                margin-top: -2px;
            }

            &::before {
                opacity: 1;
                transform: rotate(90deg);
            }

            &.open::before {
                opacity: 0;
            }
        }
    }

    .actions {
        overflow: hidden;
        padding: 10px;
        border-top: 1px solid $tertiaryBgColour;

        button {
            float: left;
            width: 33.333%;
			font-size: convert(13);
			color: $secondaryTextColour;
            border-right: 1px solid $tertiaryBgColour;

            &:last-shild {
                border-right: none;
            }

            &.check-in {
                background: #04C0DD;
            }

            &.no-show {
                background: #FA0505;
            }

            &.cancel {
                background: $primaryBgColour;
            }
        }
    }

	.tour-summary span {
	    float: left;
	    font-size: convert(13);
	    color: $secondaryTextColour;
	}
}
</style>
