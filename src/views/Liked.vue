<template>
    <h1>Liked Page</h1>
    <div class="grid-container" v-if="liked.length > 0">
      <div class="grid-item" v-for="item in liked" :key="item.id" @click="handleClick(item.id, item.type)">
        <GridItem :item="item" :liked="liked" @handleLike="handleLike" @handleUnlike="handleUnlike" :type="item.type" />
      </div>
    </div>
    <div v-else class="nodata-flex">
      <h2 class="text-center">You haven't liked anything yet</h2>
    </div>
</template>

<script>
import { imageChecker, emptyStringChecker, likeMixins } from "@/mixins";
import GridItem from '../components/GridItem.vue';
export default {
    name: "Liked",
    components: { GridItem },
    mixins: [imageChecker, emptyStringChecker, likeMixins],
    data() {
        return {
            liked: [],
        };
    },

    async mounted() {
        this.getLiked();
    },

    methods: {
        getLiked() {
            const liked = JSON.parse(localStorage.getItem("liked")) || [];
            this.liked = liked;
        }
    },
};
</script>