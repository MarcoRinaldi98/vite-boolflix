<script>
import axios from 'axios';

import { store } from '../store.js';

import AppCard from './AppCard.vue';

export default {
    name: 'AppMain',
    components: {
        AppCard
    },
    data() {
        return {
            store
        }
    },
    methods: {
        getMovieCast(id) {
            this.store.castList = [];

            let urlCastApi = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=97153ebbe3459c0d939b47dd1103baa8`;

            for (let i = 0; i < 5; i++) {
                axios.get(urlCastApi)
                    .then(response => {
                        this.store.castList.push(response.data.cast[i].name);
                    })
            }
        },
        getSerieCast(id) {
            this.store.castList = [];

            let urlCastApi = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=97153ebbe3459c0d939b47dd1103baa8`;

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
        <section v-if="store.movies.length > 0 || store.series.length > 0" class="text-center py-3">
            <label for="genere" class="text-white fs-3 pe-2">Filtra per genere:</label>
            <select class="scelta-genere" name="genere" id="genere" v-model="store.select" @change="$emit('doChange')">
                <option value="" selected>All</option>
                <option v-for="(genre, i) in store.allGenres" :value="genre.id" :key="i">{{ genre.name }}</option>
            </select>
        </section>

        <section v-if="store.movies.length > 0" class="container w-100">
            <h2 class="fw-bold text-white py-3">FILM</h2>
            <div class="wrapper">
                <AppCard class="film" v-for="movie in store.movies" :key="movie.id" :item="movie"
                    v-show="movie.genre_ids.includes(store.select) || store.select == ''" @click="getMovieCast(movie.id)" />
            </div>
        </section>

        <section v-if="store.series.length > 0" class="container w-100">
            <h2 class="fw-bold text-white py-3">SERIE</h2>
            <div class="wrapper">
                <AppCard class="serie" v-for="serie in store.movies" :key="serie.id" :item="serie"
                    v-show="serie.genre_ids.includes(store.select) || store.select == ''" @click="getSerieCast(serie.id)" />
            </div>
        </section>
        <h1 class="text-center text-white pt-5"
            v-if="store.search.length > 0 && store.movies.length == 0 && store.series.length == 0">
            Nessun Risultato
        </h1>

        <h1 class="text-center text-white pt-5"
            v-if="store.search.length == 0 && store.movies.length == 0 && store.series.length == 0">
            Cerca i film e le serie tv che preferisci
            <i class="fa-solid fa-square-arrow-up-right"></i>
        </h1>
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
