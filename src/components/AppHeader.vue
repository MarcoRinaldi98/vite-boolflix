<script>
import { store } from '../store.js';

export default {
    name: 'AppHeader',
    emits: ['performSearch'],
    data() {
        return {
            store
        }
    }
}

</script>

<template>
    <header>
        <div class="header">
            <a href="#" class="text-decoration-none">
                <h1>BOOLFLIX</h1>
            </a>

            <div class="search">
                <input type="text" @keyup.enter="$emit('performSearch')" v-model="store.search" class="form-control"
                    placeholder="Cerca film e serie tv...">
                <button @click="$emit('performSearch')" class="btn btn-danger">CERCA</button>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables';
@use '../styles/partials/mixins';

.header {
    height: 100%;
    @include mixins.d-flex-between;
    background-color: variables.$color-black;

    h1 {
        color: variables.$color-red;
        font-weight: bold;
        padding-left: 1.5rem;
    }

    .search {
        display: flex;
        min-width: 350px;
        margin-right: 1.5rem;

        button {
            margin-left: 1rem;
            font-weight: bold;
        }
    }
}
</style>