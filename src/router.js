import VueRouter from 'vue-router';
import TourList from './components/TourList.vue';
import BookingForm from './components/BookingForm.vue';
import NotFound from './components/NotFound.vue';

export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: TourList
        },
        {
            name: 'book',
            path: '/book',
            component: BookingForm
        },
        {
            path: '*',
            component: NotFound
        }
    ]
});