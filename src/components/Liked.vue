<template>
    <h1>Liked Page</h1>
    <div class="grid-container">
      <div class="grid-item" v-for="item in liked" :key="item.id" @click="handleClick(item.id, item.type)">
        <img :src="item.image" alt="image" />
        <!-- flex for like and title -->
        <div class="flex">
          <h3 class="align-left">{{ item.title }}</h3>
          <button class="like-btn" @click.stop="handleUnlike(item.id)" v-if="liked.some((likedmovie) => likedmovie.id === item.id)">
            Unlike
          </button>

          <button class="like-btn" @click.stop="handleLike(item.id, item.title, item.description, item.image, item.type)"  v-else>
            Like
          </button>
        </div>
        <p class="align-left">{{ item.description.substring(0, 100) + "..." }}</p>
      </div>
    </div>
</template>

<script>
import { imageChecker, emptyStringChecker, likeMixins } from "@/mixins";
export default {
    name: "Liked",
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