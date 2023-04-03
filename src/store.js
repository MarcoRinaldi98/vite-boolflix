import { reactive } from 'vue';

export const store = reactive(
    {
        filmList: [],
        serieList: [],
        castList: [],
        genresList: [],
        search: '',
        select: ''
    }
)