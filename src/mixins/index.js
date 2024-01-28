import Axios from "axios";
export const imageChecker = {
    methods: {
        imageChecker(image) {
            if (image !== null) {
                return "https://image.tmdb.org/t/p/original" + image;
            }
            return require("@/assets/logo.png");
        }
    }
};
export const emptyStringChecker = {
    methods: {
        emptyStringChecker(string) {
            return string !== null && string != "" ? true : false;
        }
    }
};

export const likeMixins = {
    methods: {

        handleClick(id, type) {
            window.location.hash = `/details?id=${id}&type=${type}`;
        },

        handleLike(id, title, description, image, type) {
            const liked = JSON.parse(localStorage.getItem("liked")) || [];
            liked.push({
                id,
                title,
                description,
                image,
                type,
            });
            localStorage.setItem("liked", JSON.stringify(liked));
            this.getLiked();
        },

        handleUnlike(id) {
            const liked = JSON.parse(localStorage.getItem("liked")) || [];
            const index = liked.findIndex((item) => item.id === id);
            liked.splice(index, 1);
            localStorage.setItem("liked", JSON.stringify(liked));
            this.getLiked();
        },

        getLiked() {
            const liked = JSON.parse(localStorage.getItem("liked")) || [];
            this.liked = liked;
        },
    }
};

export const searchMixins = {
    methods: {
        async getDetails(id, type) {
            const api = type === "movies" ? "movie" : "tv";
            const response =
                await Axios.get(
                    "https://api.themoviedb.org/3/" + api + "/" + id + "?api_key=" +
                    import.meta.env.VITE_APP_API_KEY
                );
            console.log(response.data);
            this.data = response.data;
        }
    }
};