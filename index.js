const degree = document.getElementById("degree");

const search = document.getElementById("search");

let temperature = 0;

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
  temperature = data.forecast.items[1].temperature.avg;
  degree.textContent = `In ${inputValue} is right now ${temperature} Celsius`;
  }catch(error){
    degree.textContent = "Too many Requests";

  }

}












