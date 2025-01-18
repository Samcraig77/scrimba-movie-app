// Open movie db API key = 7da6d9bf 

const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const mainContent = document.getElementById('main-content')

let movieArray = []

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    searchMovies(searchInput.value)
    searchInput.value = ''
})

function searchMovies(title) {
    fetch (`http://www.omdbapi.com/?apikey=7da6d9bf&t=${title}`)
    .then( res => res.json())
    .then(data => {
         console.log(data)
        
         data.Response === "False" ? mainContent.innerText = `Unable to find what you're looking for. Please try another search` : showMovies(data)
        })
    
}

function showMovies(movie) {
    mainContent.innerHTML = `
    <article class="movie-article">
    <img />
    <h3>${movie.Title}</h3>
    </article>`
}