const degree = document.getElementById("degree");

const search = document.getElementById("search");

let temperature = 0;

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
    getData();
    
    

  

});


async function getData(){
  try{
  const response = await fetch(`https://forecast9.p.rapidapi.com/rapidapi/forecast/${inputValue}/hourly/`, options);
  const data = await response.json();
  temperature = data.forecast.items[16].temperature.avg;
  const lat = data.location.coordinates.latitude;
  const longi = data.location.coordinates.longitude;
  L.marker([lat,longi ]).addTo(map);
  map.setView([lat,longi],10)
  degree.textContent = `In ${inputValue} is right now ${temperature} Celsius`;
  }catch(error){
    degree.textContent = "Too many Requests";

  }

}














