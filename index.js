
const degree = document.getElementById("degree");

const search = document.getElementById("search");

const container = document.getElementById("container");

let temperature = 0;

let da = new Date();



let weather = "";

const giphyAPI = "dbyLKXs9XxYhd9vmKR6JUeSxILus3Ky8";

var map = L.map('map').setView([0, 0], 1);


const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

const tiles = L.tileLayer(tileUrl,{attribution});

tiles.addTo(map);


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '9944b9fa1cmshcfea24cb5c9348ep1df2d1jsn5c2976d1f13d',
    'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
  }
};

let inputValue = "";

function getInputValue(){
  inputValue = document.getElementById("in").value;

}


search.addEventListener("click", async function(){

  getInputValue();
  getWeather();






});


async function getWeather(){
  try{
    const response = await fetch(`https://forecast9.p.rapidapi.com/rapidapi/forecast/${inputValue}/hourly/`, options);
    const data = await response.json();
    temperature = data.forecast.items[da.getHours()+1].temperature.avg;
    weather =  data.forecast.items[da.getHours()+1].weather.text;
    console.log(weather);
    renderGif();
    const lat = data.location.coordinates.latitude;
    const longi = data.location.coordinates.longitude;
    //L.marker([lat,longi ]).addTo(map);
    map.setView([lat,longi],10)
    degree.textContent = `In ${inputValue} is right now ${temperature} Celsius`;
    degree.style.cssText = `font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-weight: bolder;
  background-color: rgb(236, 191, 132);
  box-shadow: 50px 8px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 200px;
  margin-left: 50px;`

  }catch(error){
    degree.textContent = "Too many Requests";

  }

}


async function renderGif(){
  try{

    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyAPI}&q=${weather}&limit=2&offset=2&rating=g&lang=en`);
    const gifData = await response.json();
    const url = gifData.data[1].images.downsized.url
    container.innerHTML = `
    <p id="container">
    <img id="gif" src="${url}" alt="gif">
    </p>
    
    
    `





  }catch(error){
    degree.textContent = error;


  }



}
















