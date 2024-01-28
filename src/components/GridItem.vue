<template>
    <img :src="item.image" alt="image" />
        <!-- flex for like and title -->
        <div class="flex">
          <h3 class="align-left">{{ item.title }}</h3>
          <button class="dislike-btn" @click.stop="handleUnlike(item.id)" v-if="liked.some((likedmovie) => likedmovie.id == item.id)">
            Unlike
          </button>

          <button class="like-btn" @click.stop="handleLike(item.id, item.title, item.description, item.image, type)"  v-else>
            Like
          </button>
        </div>
        <p class="align-left">{{ item.description.substring(0, 100) + "..." }}</p>
</template>

<script>
export default {
    name: "GridItem",
    props: {
        item: {
            type: Object,
            required: true
        },
        liked: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    emits: ["handleLike", "handleUnlike"],

    methods: {
        handleLike(id, title, description, image, type) {
            this.$emit("handleLike", id, title, description, image, type);
        },

        handleUnlike(id) {
            this.$emit("handleUnlike", id);
        }
    }
    
};
</script>