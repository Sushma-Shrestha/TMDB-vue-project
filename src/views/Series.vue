<template>
  <div class="grid-container">
    <div class="grid-item" v-for="item in data" :key="item.id" @click="handleClick(item.id, 'series')">
      <GridItem :item="item" :liked="liked" @handleLike="handleLike" @handleUnlike="handleUnlike" :type="'series'" />
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
import GridItem from '../components/GridItem.vue';
import Axios from "axios";
export default {
name: "Series",
components: { GridItem },
mixins: [imageChecker, emptyStringChecker, likeMixins],
data() {
  return {
    data: [],
    totalPage: 0,
    currentPage: Object.fromEntries(new URLSearchParams(window.location.hash.split('?')[1])).page ?? 1,
    liked: [],
  };
},
async mounted() {
  // const query = Object.fromEntries(new URLSearchParams(window.location.hash.split('?')[1]));
  // this.currentPage = query.page;
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
      title: item.name ?? "No title",
      description: item.overview,
      image: this.imageChecker(item.poster_path),
    }));
    window.scrollTo(0, 0);
    this.totalPage = response.data.total_pages;
    window.location.hash = `/series?page=${this.currentPage}`;
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