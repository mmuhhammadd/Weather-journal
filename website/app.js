/* Global Variables */
const apiKey = '6decea5f402964f2a9dcef3edccbdfa1&units=imperial';
const data = document.querySelector('#content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Posting data to app
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error) {
      console.log("error", error);
    }
}

// Retrieving data from app
async function getData(url = '') {
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#date').innerHTML = `${data["date"]}`;
        document.querySelector('#temp').innerHTML = `${data["temperature"]} f`;
        document.querySelector('#content').innerHTML = `${data["response"]}`;
    });
    
}

// Integrating openWeatherMap API
function getWeather() {
    const feelings = document.querySelector('#feelings').value;
    const zip = document.querySelector('#zip').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => temp = data.main.temp)
    .then(()=> {
        postData('/add', {'temperature': temp, 'date': newDate, "response": feelings})
    })
    .then(()=> {
        getData('/data');
    })
};

// Getting weather data
document.querySelector('#generate').addEventListener('click', ()=> {
    getWeather();
    window.scrollTo({
        top: data.getBoundingClientRect().top,
        behavior: "smooth"
    })
});