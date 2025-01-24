var watchlist = JSON.parse(localStorage.getItem("movies"))
console.log(watchlist)
const mainContent = document.getElementById('main-content')

async function renderStuff() {
   return await Promise.all( watchlist.map(movie =>  
        fetch(`http://www.omdbapi.com/?apikey=7da6d9bf&i=${movie.id}`)
        .then(res => res.json()) 
        .then(data => `<img src="${data.Poster}" alt="Poster for movie"/>
        <div class="movie-info">
            <div class="movie-top">
                <h3>${data.Title}</h3>
                <p> <span class="star">&#9733</span> ${data.Ratings[0].Value}</p>
            </div>
            <div class="movie-mid">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p><button type="submit" aria-label="Add to watchlist">+</button> Add to Watchlist</p>
            </div>
            <div class="movie-bottom">
                <p>${data.Plot}</p>
            </div>
        </div>
    </article>`))
)
}
