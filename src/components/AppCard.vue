<script>
import { store } from '../store.js';

export default {
    name: 'AppCard',
    props: {
        item: Object
    },
    data() {
        return {
            store,
            availableFlags: ['en', 'it', 'fr', 'es', 'ko']
        }
    },
    methods: {
        getImageUrl(path) {
            return new URL(path, import.meta.url).href
        },
        getTitle() {
            if (this.item.title) {
                return this.item.title;
            } else {
                return this.item.name;
            }
        },
        getOriginalTitle() {
            if (this.item.original_title) {
                return this.item.original_title;
            } else {
                return this.item.original_name;
            }
        },
        getRating() {
            return Math.ceil(this.item.vote_average / 2);
        }
    }
}

</script>

<template>
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img v-if="item.poster_path" :src="`https://image.tmdb.org/t/p/w342${item.poster_path}`"
                    alt="backdrop image">
                <img v-else src="/null.jpg" alt="no foto">
            </div>

            <div class="flip-card-back overflow-hidden">

                <h3 class="pt-3">{{ getTitle() }}</h3>
                <h3>{{ getOriginalTitle() }}</h3>

                <img class="language-img" :src="getImageUrl(`../assets/${item.original_language}.png`)"
                    :alt="`Flag of ${item.original_language}`" v-if="availableFlags.includes(item.original_language)" />
                <h4 v-else>
                    {{ item.original_language }}
                </h4>

                <div>
                    <i class="fa-star" v-for="i in 5" :key="i" :class="(i <= getRating() ? 'fa-solid' : 'fa-regular')"></i>
                </div>

                <p class="text-white">
                    {{ item.overview }}
                </p>

                <div v-if="store.castList.length > 0" class="text-white">
                    {{ store.castList }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables';
@use '../styles/partials/mixins';

.flip-card {
    background-color: transparent;
    @include mixins.max-wh;
    perspective: 1000px;
}

.flip-card-inner {
    position: relative;
    @include mixins.max-wh;
    transition: transform 0.8s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front {
    @include mixins.flip-card;
    background-color: #bbb;
    color: black;
}

.flip-card-back {
    @include mixins.flip-card;
    background-color: black;
    color: white;
    transform: rotateY(180deg);
}

.flip-card-front img {
    @include mixins.max-wh;
    object-fit: cover;
    object-position: bottom;
}

h3 {
    font-weight: bold;
    font-size: 24px;
}

.language-img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
}

p {
    font-size: 12px;
    margin-top: 10px;
}
</style>
