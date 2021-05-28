import axios from "axios";

export const getMovies = async (movie, type, year) => {
  await axios
    .get("http://localhost:5000/batman.movie.1997")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
};
