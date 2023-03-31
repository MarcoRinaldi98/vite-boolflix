<template></template>

<script>
import axios from 'axios';

import { store } from './store.js';

export default {
  data() {
    return {
      store
    }
  },
  methods: {
    getFilms() {
      let urlApi = 'https://api.themoviedb.org/3/search/movie?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT'

      axios.get(urlApi)
        .then(response => {
          this.store.filmList = response.data.results;
          this.store.loading = false;
        })
        .catch(err => {
          console.log(err.message);
          this.store.filmList = [];
          console.log('La ricerca non ha dato risultati');
        })
    },
    getSeries() {
      let urlApi = 'https://api.themoviedb.org/3/search/tv?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT'

      axios.get(urlApi)
        .then(response => {
          this.store.serieList = response.data.results;
          this.store.loading = false;
        })
        .catch(err => {
          console.log(err.message);
          this.store.serieList = [];
          console.log('La ricerca non ha dato risultati');
        })
    }
  },
  created() {
    this.getFilms();
    this.getSeries();
  }
}

</script>

<style lang="scss"></style>
