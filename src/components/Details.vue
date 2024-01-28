<template>
    <h1>Details Page</h1>
    
</template>

<script>
import { imageChecker, emptyStringChecker, likeMixins, searchMixins } from "@/mixins";
export default {
    name: "Details",
    mixins: [imageChecker, emptyStringChecker, likeMixins, searchMixins],
    data() {
        return {
            id: null,
            type: null,
            liked: [],
            data: {},
        };
    },

    async mounted() {
        const query = Object.fromEntries(new URLSearchParams(window.location.hash.split('?')[1]));
        console.log(query);
        this.id = query.id;
        this.type = query.type;
        this.getLiked();
        this.getDetails(this.id, this.type);
    },
};

</script>