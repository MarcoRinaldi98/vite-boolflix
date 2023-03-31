<script>
export default {
    name: 'SerieContent',
    props: {
        title: String,
        originalTitle: String,
        language: String,
        vote: String
    }
}

</script>

<template>
    <div>
        <h2>{{ title }}</h2>
        <h2>{{ originalTitle }}</h2>
        <h4>{{ language }}</h4>
        <h4>{{ vote }}</h4>
    </div>
</template>

<style lang="scss" scoped>
@use '../styles/partials/variables';
</style>
