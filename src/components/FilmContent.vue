<script>
import { store } from '../store.js';

export default {
    name: 'FilmContent',
    props: {
        image: String,
        title: String,
        originalTitle: String,
        language: String,
        vote: String,
        trama: String
    },
    data() {
        return {
            store
        }
    },
    methods: {
        getFlagImage() {
            let imageUrl = '';

            switch (this.language) {
                case 'it':
                    imageUrl = '/it.png'
                    break;

                case 'fr':
                    imageUrl = '/fr.png'
                    break;

                case 'en':
                    imageUrl = '/uk.png'
                    break;

                case 'es':
                    imageUrl = '/sp.png'
                    break;

                case 'ko':
                    imageUrl = '/kr.png'
                    break;
            }

            return imageUrl;
        },
        getBackdropImage() {
            let imageUrl = 'https://image.tmdb.org/t/p/w342';
            let backdropImage;
            if (this.image == null) {
                backdropImage = './null.jpg';
            } else {
                backdropImage = imageUrl + this.image;
            }

            return backdropImage;
        },
        getStar() {
            let votation = '';
            for (let vote = 0; vote < 5; vote++) {
                if (vote <= this.vote) {
                    votation += `<i class="fa-solid fa-star"></i>`;
                } else {
                    votation += `<i class="fa-regular fa-star"></i>`;
                }
            }
            return votation;
        }
    }
}

</script>

<template>
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
                <img :src="getBackdropImage()" alt="backdrop image">
            </div>
            <div class="flip-card-back overflow-hidden">
                <h3 class="pt-3">{{ title }}</h3>
                <h3>{{ originalTitle }}</h3>
                <h4
                    v-if="this.language !== 'it' && this.language !== 'fr' && this.language !== 'en' && this.language !== 'es' && this.language !== 'ko'">
                    {{ language }}</h4>
                <img class="language-img" v-else :src="getFlagImage()">
                <div v-html="getStar()"></div>
                <p>{{ trama }}</p>
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
