import{ initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import{ getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

const appSettings = 
{
    databaseURL: "https://eyehole-f42d0-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesData = ref(database, "Movies/");

const movies = [];

const container = document.getElementById("movie-container");

onValue(moviesData, function(snapshot)
{
    let moviesArray = Object.values(snapshot.val());

    //console.table(goodsArray);

    for (let i = 0; i < moviesArray.length; i++){
        let movie = moviesArray[i];

        console.log(movie.title);
                
        movies.push({
    title: movie.title,
    description: movie.description,
    image: movie.image
  });
  
    }


    movies.forEach(movie => {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${movie.image}" alt="${movie.title}" />
    <h2>${movie.title}</h2>
    <p>${movie.description}</p>
  `;
  container.appendChild(card);
});
});

