<template>
    <div>
        <page-header></page-header>

        <div class="container">
            <h2>No Found</h2>
            <p>The page you requested could not be found.</p>
		</div>
    </div>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
    components: {
        PageHeader
    }
}
</script>