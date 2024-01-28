<template>
  <div class="grid-container">
    <div class="grid-item" v-for="item in data" :key="item.id" @click="handleClick(item.id, 'series')">
      <img :src="item.image" alt="image" />
      <!-- flex for like and title -->
      <div class="flex">
        <h3 class="align-left">{{ item.title }}</h3>
        <button class="like-btn" @click.stop="handleUnlike(item.id)" v-if="liked.some((likedmovie) => likedmovie.id === item.id)">
          Unlike
        </button>

        <button class="like-btn" @click.stop="handleLike(item.id, item.title, item.description, item.image, 'series')"  v-else>
          Like
        </button>
      </div>
      <p class="align-left">{{ item.description.substring(0, 100) + "..." }}</p>
    </div>
  </div>
  <!-- pagination -->
  <div class="pagination">
    <button class="btn" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
    <span>Page {{ currentPage }} of {{ totalPage }}</span>
    <button class="btn" :disabled="currentPage === totalPage" @click="currentPage++">Next</button>
  </div>
</template>

<script>
import { imageChecker, emptyStringChecker, likeMixins } from "@/mixins";
import Axios from "axios";
export default {
name: "Movies",
mixins: [imageChecker, emptyStringChecker, likeMixins],
data() {
  return {
    data: [],
    totalPage: 0,
    currentPage: 1,
    liked: [],
  };
},
async mounted() {
  this.handlePageChange(this.currentPage);
  this.getLiked();
},

methods: {
  async handlePageChange(page) {
    const response = 
    await Axios.get(
      "https://api.themoviedb.org/3/tv/popular?api_key=" +
        import.meta.env.VITE_APP_API_KEY +
        "&page=" +
        page
    );
    this.data = response.data.results.map((item) => ({
      id: item.id,
      title: this.emptyStringChecker(item.title) ? item.title : item.name,
      description: item.overview,
      image: this.imageChecker(item.poster_path),
    }));
    window.scrollTo(0, 0);
    this.totalPage = response.data.total_pages;
    this.currentPage = response.data.page;
  },
},

watch: {
  currentPage: async function () {
    this.handlePageChange(this.currentPage);
  },
},
}
</script>