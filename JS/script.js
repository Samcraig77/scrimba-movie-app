// Open movie db API key = 7da6d9bf 

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const mainContent = document.getElementById('main-content')
const addBtnArray = document.querySelectorAll('.add-btn')
var existingMovies = JSON.parse(localStorage.getItem("movies"))
document.addEventListener('click', e => {
    [...e.target.classList] == 'info-btn' ? getPlot(e.target.dataset.imdbid, e.target.parentElement) :
    [...e.target.classList] == 'add-btn' ? addMovieToLocalStorage(e.target.dataset.imdbid) : ''
})

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    searchMovies(searchInput.value)
})

searchForm.addEventListener('input', e => 
    searchMovies(searchInput.value)
)

function addMovieToLocalStorage(id) {
    const movieObject = {"id": `${id}`}
    localStorage.setItem("movies" , JSON.stringify(movieObject))
    console.log(JSON.parse(localStorage.getItem("movies")))
}

function searchMovies(title) {
    fetch (`http://www.omdbapi.com/?apikey=7da6d9bf&s=${title}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.Response === "False" ? mainContent.innerText = `Unable to find what you're looking for. Please try another search` : mainContent.innerHTML = showMovies(data.Search)

        console.log(showMovies(data.Search))
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
                    <p><button type="submit" class="add-btn" data-imdbid="${entry.imdbID}" aria-label="Add to watchlist">+</button> Add to Watchlist</p>
                </div>

                <div class="movie-bottom">
                    <button type="button" class="info-btn" href="none" data-imdbid="${entry.imdbID}">More info...</button>
                </div>

            </div>
        </article>`).join('')
}

function getPlot(id, parent) {
     fetch(`http://www.omdbapi.com/?apikey=7da6d9bf&i=${id}`)
    .then(res => res.json())
    .then(data => {
       parent.innerText = data.Plot
    })
}

function displayMovieArray() {
    console.log(userMovieArray)
}

function handleMoviePoster(poster) {
    poster === 'N/A' ? poster = '/images/placeholder-movie-poster.jpg' : ''

    return poster
}