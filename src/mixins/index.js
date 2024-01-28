import Axios from "axios";
export const imageChecker = {
    methods: {
        imageChecker(image) {
            if (image !== null) {
                return "https://image.tmdb.org/t/p/original" + image;
            }
            return "src/assets/no-image.jpg";
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
            console.log(id);
            const liked = JSON.parse(localStorage.getItem("liked")) || [];
            const index = liked.findIndex((item) => item.id == id);
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
            const api = type == "movies" ? "movie" : "tv";
            const response =
                await Axios.get(
                    "https://api.themoviedb.org/3/" + api + "/" + id + "?api_key=" +
                    import.meta.env.VITE_APP_API_KEY
                );
            const credits =
                await Axios.get(
                    "https://api.themoviedb.org/3/" + api + "/" + id + "/credits?api_key=" +
                    import.meta.env.VITE_APP_API_KEY
                );
            this.data = {
                genres: response.data.genres ?? [],
                production_companies: response.data.production_companies ?? [],
                production_countries: response.data.production_countries ?? [],
                popularity: response.data.popularity ?? 0,
                overview: response.data.overview ?? "",
                poster_path: response.data.poster_path ?? "",
                release_date: response.data.release_date ?? "",
                title: api === "movie" ? response.data.title : response.data.name,
                vote_average: response.data.vote_average ?? 0,
                vote_count: response.data.vote_count ?? 0,
                status: response.data.status ?? "",
                cast: credits.data.cast ?? [],
                crew: credits.data.crew ?? [],
                image: response.data.poster_path ?? "",
                number_of_seasons: response.data.number_of_seasons ?? 0,
                number_of_episodes: response.data.number_of_episodes ?? 0,
            };
            console.log(this.data);
        }
    }
};