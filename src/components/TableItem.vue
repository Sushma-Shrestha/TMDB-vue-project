<template>
    <td class="vertical-top"><img :src="item.image" alt="image" class="table-image" /></td>
    <td class="text-left title vertical-top">{{ item.title }}</td>
    <td class="text-left vertical-top description">
        {{ item.description.substring(0, 300) + "..." }}
    </td>
    <td class="vertical-top text-center">
        <button class="dislike-btn table-btn" @click.stop="handleUnlike(item.id)" v-if="liked.some((likedmovie) => likedmovie.id == item.id)">
            Unlike
        </button>

        <button class="like-btn table-btn" @click.stop="handleLike(item.id, item.title, item.description, item.image, type)"  v-else>
            Like
        </button>
    </td>
</template>

<script>
export default {
    name: "TableItem",
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