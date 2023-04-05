<template>
  <header>
    <AppHeader @performSearch="doSearch" />
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
    doSearch() {
      this.getMovies();
      this.getSeries();
    },
    getMovies() {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT&query=${store.search}`)
        .then(response => {
          this.store.movies = response.data.results;
        })
    },
    getSeries() {
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT&query=${store.search}`)
        .then(response => {
          this.store.series = response.data.results;
        })
    },
    mergeGenres() {
      this.store.allGenres = [];

      for (let i = 0; i < this.store.genresMovies.length; i++) {
        const currentGenre = this.store.genresMovies[i];
        this.store.allGenres.push({ ...currentGenre });
      }

      for (let i = 0; i < this.store.genresSeries.length; i++) {
        const currentGenreSerie = this.store.genresSeries[i];

        let found = false;

        for (let x = 0; x < this.store.allGenres.length; x++) {
          const currentGenreAll = this.store.allGenres[x];
          if (currentGenreSerie.id == currentGenreAll.id) {
            found = true;
          }
        }
        if (found == false) {
          this.store.allGenres.push({ ...currentGenreSerie });
        }
      }
    }
  },
  created() {
    this.getMovies();

    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT`)
      .then(response => {
        this.store.genresMovies = response.data.genres;
        this.mergeGenres();
      })

    axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=97153ebbe3459c0d939b47dd1103baa8&language=it-IT`)
      .then(response => {
        this.store.genresSeries = response.data.genres;
        this.mergeGenres();
      })

  }
}

</script>

<style lang="scss">
@use "./styles/general.scss" as *;
</style>
