const movies = Object.entries(JSON.parse(localStorage.getItem("movies")))
const watchlistArray = [...Array.from(movies)]

const mainContent = document.getElementById('main-content')

mainContent.innerHTML = renderStuff(watchlistArray)

function renderWatchlist(arr) {
    let watchlist = ''
    for (let i = 0 ; i < arr.length ; i++) {
        let newArr = arr[i][1].id
        let stars = newArr.Ratings
       watchlist += `
       <article class="movie-article">
       <div class="photo-container">
       <img src="${newArr.Poster}" alt="Poster for movie"/>
       </div>
        <div class="movie-info">
            <div class="movie-top">
                <h3>${newArr.Title}</h3>
                <p> <span class="star">&#9734</span> ${stars[0].Value}</p>
            </div>
            <div class="movie-mid">
                <p>${newArr.Runtime}</p>
                <p>${newArr.Genre}</p>
            </div>
            <div class="movie-bottom">
                <p>${newArr.Plot}</p>
            </div>
        </div>
    </article>`
    }

    return watchlist
}
