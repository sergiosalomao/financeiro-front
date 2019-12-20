<template>
    <v-col>
        <h2>{{titulo}}</h2>
    </v-col>
</template>
<script>
export default {
    name: 'TitleComponent',
    props: {
        titulo: {
            type: String,
            required: true
        }
    }
}
</script>