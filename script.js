window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 2000);
  });

import{ initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import{ getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

const appSettings = 
{
    databaseURL: "https://eyehole-f42d0-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesData = ref(database, "Movies/");
const actorsData = ref(database, "Actors/");

const containerMovies = document.getElementById("movie-container");
const containerActors = document.getElementById("actor-container");

if (containerMovies)
{
  onValue(moviesData, function(snapshot)
{
  let moviesArray = Object.values(snapshot.val());

    //console.table(goodsArray);

  for (let i = 0; i < moviesArray.length; i++)
  {
    let movie = moviesArray[i];

      //console.log(movie.title);

    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}" />
      <h2>${movie.title}</h2>
      <p>${movie.description}</p>
    `;
    containerMovies.appendChild(card);
  }
});
}

if (containerActors)
{
  onValue(actorsData, function(snapshot)
{
  let actorsArray = Object.values(snapshot.val());

    //console.table(goodsArray);

  for (let i = 0; i < actorsArray.length; i++)
  {
    let actor = actorsArray[i];

      //console.log(movie.title);

    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${actor.image}" alt="${actor.name}" />
      <h2>${actor.name}</h2>
      <p>${actor.description}</p>
    `;
    containerActors.appendChild(card);
  }
});
}