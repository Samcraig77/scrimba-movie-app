const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const mainContent = document.getElementById('main-content')
const addBtnArray = document.querySelectorAll('.add-btn')

document.addEventListener('click', e => {
    [...e.target.classList] == 'info-btn' ? getPlot(e.target.dataset.imdbid, e.target.parentElement) :
    [...e.target.classList] == 'add-btn' ? getMovieInfo(e.target.dataset.imdbid) : ''
})

searchForm.addEventListener('submit', function() {
    e.preventDefault()
    searchMovies(searchInput.value)
})

searchForm.addEventListener('input', e => 
    searchMovies(searchInput.value)
)

function addMovieToLocalStorage(id) {
    let currentWatchlist = getCurrentWatchlist()
    const movieObject = {"id": `${id}`}
    console.log(movieObject)
    currentWatchlist.push(movieObject)
    currentWatchlist = JSON.stringify(currentWatchlist)
    localStorage.setItem("movies" , currentWatchlist)
    console.log(JSON.parse(localStorage.getItem("movies")))
}

function getMovieInfo(id) {
    fetch(`http://www.omdbapi.com/?apikey=7da6d9bf&i=${id}`)
    .then(res => res.json())
    .then(data => {
        let currentWatchlist = getCurrentWatchlist()
        const movieObject = {"id": data}
        currentWatchlist.push(movieObject)
        currentWatchlist = JSON.stringify(currentWatchlist)
        localStorage.setItem("movies" , currentWatchlist)
    })
}

function getCurrentWatchlist() {
    let currentWatchlist = JSON.parse(localStorage.getItem("movies"))
    !currentWatchlist ? currentWatchlist = [] : ''
    return currentWatchlist 
}

function searchMovies(title) {
    fetch (`http://www.omdbapi.com/?apikey=7da6d9bf&s=${title}`)
    .then(res => res.json())
    .then(data => {
        data.Response === "False" ? mainContent.innerText = `Unable to find what you're looking for. Please try another search`
        : mainContent.innerHTML = showMovies(data.Search).join('')
    })
    .catch(err => console.error(err))
}

function showMovies(arr) {
   return arr.map( entry => `
        <article class="movie-article">
            <div class="photo-container">
                <img src="${handleMoviePoster(entry.Poster)}" alt="Poster for movie"/>
            </div>

            <div class="movie-info">

                <div class="movie-top">
                    <h3>${entry.Title}</h3>
                </div>

                <div class="movie-mid">
                        ${addBtnHandler(entry.imdbID)}
                </div>

                <div class="movie-bottom">
                    <button type="button" class="info-btn" href="none" data-imdbid="${entry.imdbID}">More info...</button>
                </div>

            </div>
        </article>`)
}

function addBtnHandler(id) {
    let currentWatchlist = getCurrentWatchlist()
    const movieId = currentWatchlist.find(movie => movie.id == id)
    if (movieId) {
        return `
        <p>
        This movie is on your Watchlist
        </p>
        `
    } else {
        return `
        <p>
            <button type="submit" class="add-btn" data-imdbid="${id}" aria-label="Add to watchlist">+</button>
            Add to Watchlist
        </p>`
    }
}

function getPlot(id, parent) {
     fetch(`http://www.omdbapi.com/?apikey=7da6d9bf&i=${id}`)
    .then(res => res.json())
    .then(data => {
       parent.innerText = data.Plot
    })
}

function handleMoviePoster(poster) {
    poster === 'N/A' ? poster = '/images/placeholder-movie-poster.jpg' : ''

    return poster
}