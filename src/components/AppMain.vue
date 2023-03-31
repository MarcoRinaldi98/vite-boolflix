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
        <div v-if="this.store.filmList.length > 0 || this.store.serieList.length > 0">
            <div class="container w-100">
                <h2 v-show="this.store.filmList.length > 0" class="fw-bold text-white py-3">FILM</h2>
                <div class="wrapper">
                    <div v-for="(film, i) in store.filmList" class="film">
                        <FilmContent :image="film.poster_path" :title="film.title" :originalTitle="film.original_title"
                            :language="film.original_language" :vote="Math.floor(film.vote_average / 2)"
                            :trama="film.overview" :key="i" />
                    </div>
                </div>
                <h2 v-show="this.store.serieList.length > 0" class="fw-bold text-white py-3">SERIE</h2>
                <div class="wrapper">
                    <div v-for="(serie, i) in store.serieList" class="serie">
                        <SerieContent :image="serie.poster_path" :title="serie.name" :originalTitle="serie.original_name"
                            :language="serie.original_language" :vote="Math.floor(serie.vote_average / 2)"
                            :trama="serie.overview" :key="i" />
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else-if="this.store.search.length > 0 && this.store.filmList.length == 0 && this.store.serieList.length == 0">
            <h1 class="text-center text-white pt-5">
                Nessun Risultato
            </h1>
        </div>
        <div v-else>
            <h1 class="text-center text-white pt-5">
                Cerca i film e le serie tv che preferisci
                <i class="fa-solid fa-square-arrow-up-right"></i>
            </h1>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables';
@use '../styles/partials/mixins';

.wrapper {
    @include mixins.d-flex-wrap-center;
    text-align: center;
    width: 100%;

    .film {
        @include mixins.card-display;
    }

    .serie {
        @include mixins.card-display;
    }
}
</style>
