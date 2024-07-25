import generateJoke from "./joke";
import "./styles/main.scss";
import "./styles/main.css";
import laughing from "./assets/laughing.svg";

const img = document.getElementById("laughingImg");
img.src = laughing;

const jokeBtn = document.getElementById("jokeBtn");
jokeBtn.addEventListener("click", generateJoke);

generateJoke();
