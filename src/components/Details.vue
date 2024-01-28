<template>
    <div class="flex-center">
        <div class="poster-image">
            <img :src="imageChecker(data.poster_path)" alt="poster" class="detail-image" />
        </div>
        <div class="detail-content">
            <h2 class="mb-2">{{ data.title }}</h2>
            <div class="flex">
            <div>
                <p>Release date: {{ data.release_date }}</p>
                <p class="mb-2">Vote: {{ data.vote_average }} / {{ data.vote_count }}</p>
            </div>
                <button class="dislike-btn" @click.stop="handleUnlike(id)" v-if="liked.some((likedmovie) => likedmovie.id == id)">
                Unlike
                </button>

                <button class="like-btn" @click.stop="handleLike(id, data.title, data.overview, imageChecker(data.poster_path), type)"  v-else>
                Like
                </button>
            </div>
            <div class="flex-start">
                Genres: 
                <span v-for="genre in data.genres" :key="genre.id" class="genre">
                    {{ genre.name }}
                </span>
            </div>
            <div>{{ data.overview }}</div>
        </div>
    </div>
    <h2 class="mt-2 mb-2">Casts / Actors:</h2>
    <div class="cast-flex">
        <div v-for="casts in data.cast" :key="casts.id" class="casts">
            <img :src="imageChecker(casts.profile_path)" alt="poster" class="cast-image" width="100" height="100" />
            <p class="text-center">{{ casts.name }}</p>
        </div>
    </div>
    <h2 class="mt-5 mb-2">Crew Members:</h2>
    <div class="cast-flex">
        <div v-for="casts in data.crew" :key="casts.id" class="casts">
            <img :src="imageChecker(casts.profile_path)" alt="poster" class="cast-image" width="100" height="100" />
            <p class="text-center">{{ casts.name }}</p>
        </div>
    </div>
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
            data: {}
        };
    },

    async mounted() {
        const query = Object.fromEntries(new URLSearchParams(window.location.hash.split('?')[1]));
        this.id = query.id;
        this.type = query.type;
        this.getLiked();
        this.getDetails(this.id, this.type);
        console.log(this.data);
    },
};
</script>
