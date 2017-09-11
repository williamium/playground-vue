<template>
    <div class="error" v-if="store.errorMessage">
        <p>{{ store.errorMessage }}</p>
        <button type="button" @click="store.errorMessage = ''">Clear</button>
    </div>
</template>

<script>
import store from '../store/store.js';

export default {
    data() {
        return {
            store: store.state
        }
    }
}
</script>

<style lang="scss">
@import '../css/_helpers.scss';

.error {
    overflow: hidden;
	background: #FA0505;
    margin: 10px 0;
    padding: 10px;
    text-align: center;
    color: $secondaryTextColour;

    p {
        font-size: convert(20);
        margin: 0 0 0.5em;
    }

    button {
        padding: 7px 10px;
        font-size: convert(13);
    }
}
</style>