import { reactive } from 'vue';

export const store = reactive(
    {
        movies: [],
        series: [],
        search: '',
        genresMovies: [],
        genresSeries: [],
        allGenres: [],
        select: '',
        castList: []
    }
)