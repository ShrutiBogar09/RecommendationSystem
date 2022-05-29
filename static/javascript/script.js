const carousel = document.querySelector('.carousel');
let sliders = []

let slideIndex = 0;

const createSlide = () => {
    if(slideIndex >= movies.length) {
        slideIndex = 0;
    }

    // creating DOM element
    let slide = document.createElement('div');
    let imgEle = document.createElement('img');
    let cont = document.createElement('div');
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    
    // attaching all elements
    imgEle.appendChild(document.createTextNode(''));
    h1.appendChild(document.createTextNode(movies[slideIndex].name));
    p.appendChild(document.createTextNode(movies[slideIndex].des));
    cont.appendChild(h1);
    cont.appendChild(p);
    slide.appendChild(cont);
    slide.appendChild(imgEle);
    carousel.appendChild(slide);

    // setting up image
    imgEle.src = movies[slideIndex].image;
    slideIndex++;

    // setting elements classname
    slide.className = 'slides';
    cont.className = 'slide-cont';
    h1.className = 'mov-title';
    p.className = 'mov-des';

    sliders.push(slide);

    // sliding effect
    if(sliders.length) {
        sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${30 * (sliders.length - 2)}px)`;
    } 
}

for(let i=0; i<3; i++) {
    createSlide();
}

setInterval(() => {
    createSlide();
}, 3000);

// slide cards

let cardContainer = document.querySelectorAll('.card-cont');
let prevBtns = document.querySelectorAll('.prev-btn');
let nextBtns = document.querySelectorAll('.next-btn');

cardContainer.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nextBtns[i].addEventListener('click', () => {
        item.scrollleft += containerWidth - 200; 
    })

    prevBtns[i].addEventListener('click', () => {
        item.scrollleft -= containerWidth + 200; 
    })
})


//TMDB API

const API_KEY = 'api_key=646d706df9ce25c8fb5ffc9be03093f0';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const s_card_cont = document.getElementById('s-card-cont');
const a_card_cont = document.getElementById('a-card-cont');
const v_card_cont = document.getElementById('v-card-cont');
const t_card_cont = document.getElementById('t-card-cont');
const d_card_cont = document.getElementById('d-card-cont');
const form = document.getElementById('form');
const search = document.getElementById('search-bar');

getMoviesOnSearch(API_URL);

function getMoviesOnSearch(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMoviesOnSearch(data.results);
    })
}

function showMoviesOnSearch(data) {
    s_card_cont.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="card">
                <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" class="card-img" alt="${title}">
                <div class="card-body">
                    <h2 class="mov-name">${title}</h2>
                    <h6 class="des">${overview}</h6>
                    <button class="watchlist-btn">Add To Watchlist</button>
                </div>
            </div>`

        s_card_cont.appendChild(movieEl);
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchT = search.value;

    if(searchT) {
        getMoviesOnSearch(searchURL+'&query='+searchT)
    }else {
        getMoviesOnSearch(API_URL);
    }
})


//Genre1
var FamGenre = []
FamGenre.push(10751);
console.log(FamGenre)
getMoviesFam(API_URL + '&with_genres='+encodeURI(FamGenre.join(',')))

function getMoviesFam(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMoviesFam(data.results);
    })
}

function showMoviesFam(data) {
    a_card_cont.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="card">
                <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" class="card-img" alt="${title}">
                <div class="card-body">
                    <h2 class="mov-name">${title}</h2>
                    <h6 class="des">${overview}</h6>
                    <button class="watchlist-btn">Add To Watchlist</button>
                </div>
            </div>`

        a_card_cont.appendChild(movieEl);
    })
}

//Genre2
var MysteryGenre = []
MysteryGenre.push(9648);
console.log(MysteryGenre)
getMoviesMystery(API_URL + '&with_genres='+encodeURI(MysteryGenre.join(',')))

function getMoviesMystery(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMoviesMystery(data.results);
    })
}

function showMoviesMystery(data) {
    v_card_cont.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="card">
                <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" class="card-img" alt="${title}">
                <div class="card-body">
                    <h2 class="mov-name">${title}</h2>
                    <h6 class="des">${overview}</h6>
                    <button class="watchlist-btn">Add To Watchlist</button>
                </div>
            </div>`

        v_card_cont.appendChild(movieEl);
    })
}

//Genre3
var ThriGenre = []
ThriGenre.push(53);
console.log(ThriGenre)
getMoviesThri(API_URL + '&with_genres='+encodeURI(ThriGenre.join(',')))

function getMoviesThri(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMoviesThri(data.results);
    })
}

function showMoviesThri(data) {
    t_card_cont.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="card">
                <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" class="card-img" alt="${title}">
                <div class="card-body">
                    <h2 class="mov-name">${title}</h2>
                    <h6 class="des">${overview}</h6>
                    <button class="watchlist-btn">Add To Watchlist</button>
                </div>
            </div>`

        t_card_cont.appendChild(movieEl);
    })
}

//Genre4
var HorrorGenre = []
HorrorGenre.push(27);
console.log(HorrorGenre)
getMoviesHorror(API_URL + '&with_genres='+encodeURI(HorrorGenre.join(',')))

function getMoviesHorror(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        showMoviesHorror(data.results);
    })
}

function showMoviesHorror(data) {
    d_card_cont.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <div class="card">
                <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" class="card-img" alt="${title}">
                <div class="card-body">
                    <h2 class="mov-name">${title}</h2>
                    <h6 class="des">${overview}</h6>
                    <button class="watchlist-btn">Add To Watchlist</button>
                </div>
            </div>`

        d_card_cont.appendChild(movieEl);
    })
}