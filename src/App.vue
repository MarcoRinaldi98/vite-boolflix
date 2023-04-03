<template>
  <header>
    <AppHeader @doSearch="getFilmsAndSeries" />
  </header>

  <main>
    <AppMain @doChange="showFilteredGenre" />
  </main>
</template>

<script>
import axios from 'axios';

import { store } from './store.js';

import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';

export default {
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      store
    }
  },
  methods: {
    getFilmsAndSeries() {

      let urlFilmApi = 'https://api.themoviedb.org/3/search/movie?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT';
      let urlSeriesApi = 'https://api.themoviedb.org/3/search/tv?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT'

      if (store.search.length > 0) {
        urlFilmApi += `&query=${store.search}`;
        urlSeriesApi += `&query=${store.search}`;
      }

      axios.get(urlFilmApi)
        .then(response => {
          this.store.filmList = response.data.results;
        })
        .catch(err => {
          console.log(err.message);
          this.store.filmList = [];
          console.log('La ricerca non ha dato risultati');
        })

      axios.get(urlSeriesApi)
        .then(response => {
          this.store.serieList = response.data.results;
        })
        .catch(err => {
          console.log(err.message);
          this.store.serieList = [];
          console.log('La ricerca non ha dato risultati');
        })
    },
    getAllGenres() {
      let urlGenresApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=97153ebbe3459c0d939b47dd1103baa8';

      axios.get(urlGenresApi)
        .then(response => {
          this.store.genresList = response.data.genres;
        })
    },
    showFilteredGenre() {
      this.store.filmList = [];
      this.store.serieList = [];

      let urlFilteredFilm = `https://api.themoviedb.org/3/search/movie?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT&query=${store.search}&genre_ids=${store.select}`;
      let urlFilteredSerie = `https://api.themoviedb.org/3/search/tv?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT&query=${store.search}&genre_ids=${store.select}`;

      axios.get(urlFilteredFilm)
        .then(response => {
          this.store.filmList = response.data.results;
        })

      axios.get(urlFilteredSerie)
        .then(response => {
          this.store.serieList = response.data.results;
        })

    }
  },
  created() {
    this.getFilmsAndSeries();
    this.getAllGenres();
  }
}

</script>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>
