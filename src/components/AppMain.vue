<script>
import axios from 'axios';

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
    },
    methods: {
        getFilmCast(id) {
            this.store.castList = [];

            let urlCastApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=97153ebbe3459c0d939b47dd1103baa8`;

            for (let i = 0; i < 5; i++) {
                axios.get(urlCastApi)
                    .then(response => {
                        this.store.castList.push(response.data.cast[i].name);
                    })
            }
        }
    }
}

</script>

<template>
    <main>
        <div v-if="this.store.filmList.length > 0 || this.store.serieList.length > 0">
            <div class="text-center py-3">
                <label for="genere" class="text-white fs-3 pe-2">Filtra per genere:</label>
                <select class="scelta-genere" name="genere" id="genere" v-model="store.select" @change="$emit('doChange')">
                    <option value="" selected>All</option>
                    <option v-for="(genre, i) in store.genresList" :value="genre.id[0]" :key="i">{{ genre.name }}</option>
                </select>
            </div>
            <div class="container w-100">
                <h2 v-show="this.store.filmList.length > 0" class="fw-bold text-white py-3">FILM</h2>
                <div class="wrapper">
                    <div v-for="(film, i) in store.filmList" class="film" @click="getFilmCast(film.id)">
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

.scelta-genere {
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
}

.wrapper {
    @include mixins.d-flex-wrap-center;
    text-align: center;
    width: 100%;
    cursor: pointer;

    .film {
        @include mixins.card-display;
    }

    .serie {
        @include mixins.card-display;
    }
}
</style>
