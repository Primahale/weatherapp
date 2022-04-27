
function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    let iframe = document.getElementById("gmap_canvas");
    let bag = document.getElementById("bag");
    cityName.innerHTML = "--"+newName.value+"--";


    async function getWeatherData(){
      
        let city = document.getElementById("cityInput").value
        let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${newName.value}&appid=32ba0bfed592484379e51106cef3f204&units=metric`)

        let data = await res.json();
        // console.log(data)
        showWeather(data);
    }
    getWeatherData();


    function showWeather(data){
        console.log("data:",data)

        bag.innerHTML = null;

        let temp = document.createElement("h2");
        temp.innerText = `Temp - ${data.main.temp}°C`;

        let humidity = document.createElement("h3")
        humidity.innerText = `Humidity - ${data.main.humidity}`

        let pressure = document.createElement("h3")
        pressure.innerText = `Pressure - ${data.main.pressure}`

        let wind = document.createElement("h3");
        wind.innerText = `Wind - ${data.wind.speed}`

        let clouds = document.createElement("h3");
        clouds.innerText = `Clouds - ${data.clouds.all}`

        iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;


        bag.append(temp,humidity,pressure,wind,clouds);
    }


fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=32ba0bfed592484379e51106cef3f204')
.then(response => response.json())
.then(data => {

    //Getting the min and max values for each day
    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
    }
    //------------------------------------------------------------

    //Getting Weather Icons
     for(i = 0; i<7; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    console.log(data)


})

.catch(err => ("Something Went Wrong:"))
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<7; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }

