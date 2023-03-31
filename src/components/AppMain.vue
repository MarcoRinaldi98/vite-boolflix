<script>
import { store } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            store
        }
    }
}

</script>

<template>
    <main>
        <div class="container bg-white pt-3">
            <h2>FILM</h2>
            <div class="wrapper">
                <div v-for="(film, i) in store.filmList" class="film">
                    <h2>{{ film.title }}</h2>
                    <h2>{{ film.original_title }}</h2>
                    <h4>{{ film.original_language }}</h4>
                    <h4>{{ film.vote_average }}</h4>
                </div>
            </div>
            <h2>SERIE</h2>
            <div class="wrapper">
                <div v-for="(serie, i) in store.serieList" class="serie">
                    <h2>{{ serie.name }}</h2>
                    <h2>{{ serie.original_name }}</h2>
                    <h4>{{ serie.original_language }}</h4>
                    <h4>{{ serie.vote_average }}</h4>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables';

.wrapper {
    display: flex;
    flex-wrap: wrap;

    .film {
        background-color: black;
        margin: 10px;
    }

    .serie {
        background-color: black;
        margin: 10px;
    }
}
</style>
