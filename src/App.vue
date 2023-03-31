<template>
  <header>
    <AppHeader @doSearch="getFilmsAndSeries" />
  </header>

  <main>
    <AppMain />
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
    }
  },
  created() {
    this.getFilmsAndSeries();
  }
}

</script>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>
