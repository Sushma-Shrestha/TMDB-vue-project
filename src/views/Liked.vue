<template>
    <h1>Liked Page</h1>
    <!-- option for grid or table -->
    <div class="option" v-if="liked.length > 0">
      <button class="btn tabs" @click="isGrid = true" :class="isGrid?'active':''">Grid View</button>
      <button class="btn tabs" @click="isGrid = false" :class="isGrid?'':'active'">Table View</button>
    </div>
    <div v-if="liked.length > 0 && !isGrid" class="responsive">
        <table class="liked-table">
        <tr v-for="item in liked" :key="item.id" @click="handleClick(item.id, item.type)">
            <TableItem :item="item" :liked="liked" @handleLike="handleLike" @handleUnlike="handleUnlike" :type="item.type" />
        </tr>
        </table>
    </div>
    <div v-else-if="liked.length > 0 && isGrid">
        <div class="grid-container">
        <div class="grid-item" v-for="item in liked" :key="item.id" @click="handleClick(item.id, item.type)">
            <GridItem :item="item" :liked="liked" @handleLike="handleLike" @handleUnlike="handleUnlike" :type="item.type" />
        </div>
        </div>
    </div>
    <div v-else class="nodata-flex">
      <h2 class="text-center">You haven't liked anything yet</h2>
    </div>
</template>

<script>
import { imageChecker, emptyStringChecker, likeMixins } from "@/mixins";
import TableItem from '../components/TableItem.vue';
import GridItem from '../components/GridItem.vue';
export default {
    name: "Liked",
    components: { TableItem, GridItem },
    mixins: [imageChecker, emptyStringChecker, likeMixins],
    data() {
        return {
            liked: [],
            isGrid: true,
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