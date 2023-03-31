<script>
export default {
    name: 'FilmContent',
    props: {
        title: String,
        originalTitle: String,
        language: String,
        vote: String
    },
    data() {
        return {

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

                case 'ja':
                    imageUrl = '/jp.png'
                    break;

                case 'kr':
                    imageUrl = '/kr.png'
                    break;
            }

            return imageUrl;
        }
    }
}

</script>

<template>
    <div>
        <h2>{{ title }}</h2>
        <h2>{{ originalTitle }}</h2>
        <h4 v-if="this.language !== 'it' && 'fr' && 'en' && 'sp' && 'jp' && 'kr'"> {{ language }}</h4>
        <img v-else :src="getFlagImage()">
        <h4>{{ vote }}</h4>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables';

img {
    width: 30px;
    height: 30px;
}
</style>
