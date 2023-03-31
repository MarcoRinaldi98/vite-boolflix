<script>
import { store } from '../store.js';

import FilmContent from './FilmContent.vue';
import SerieContent from './SerieContent.vue';

export default {
    name: 'AppMain',
    components: {
        FilmContent,
        SerieContent
    },
    data() {
        return {
            store
        }
    }
}

</script>

<template>
    <main>
        <div class="container bg-white w-100">
            <h2 class="fw-bold">FILM</h2>
            <div class="wrapper">
                <div v-for="(film, i) in store.filmList" class="film">
                    <FilmContent :title="film.title" :originalTitle="film.original_title" :language="film.original_language"
                        :vote="film.vote_average" :key="i" />
                </div>
            </div>
            <h2 class="fw-bold">SERIE</h2>
            <div class="wrapper">
                <div v-for="(serie, i) in store.serieList" class="serie">
                    <SerieContent :title="serie.name" :originalTitle="serie.original_name"
                        :language="serie.original_language" :vote="serie.vote_average" :key="i" />
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
    text-align: center;
    width: 100%;

    .film {
        background-color: black;
        color: variables.$color-white;
        margin: 10px;
        width: calc(100% / 4 - 20px);
        height: 400px;
    }

    .serie {
        background-color: black;
        color: variables.$color-white;
        margin: 10px;
        width: calc(100% / 4 - 20px);
        height: 400px;
    }
}
</style>
