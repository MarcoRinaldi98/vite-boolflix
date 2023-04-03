<script>
import { store } from '../store.js';

export default {
    name: 'CastOverlay',
    data() {
        return {
            store
        }
    }
}

</script>

<template>
    <div class="overlay">
        <div class="content" v-if="store.castList.length > 0">
            uoooo
            {{ store.castList[0].name }},
            {{ store.castList[1].name }},
            {{ store.castList[2].name }},
            {{ store.castList[3].name }},
            {{ store.castList[4].name }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables';
@use '../styles/partials/mixins';

.overlay {
    z-index: 9998;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
}

.content {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    background-color: white;
    color: white;
}
</style>
