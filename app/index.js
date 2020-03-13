//MODEL
const model = {

  isCelsius: true,
  toggleCelsius(){
    this.isCelsius = !this.isCelsius;
  },
  
  get location(){
    return this._location;
  },
  set location(location){
    this._location = location;
  },
  get temperature(){
    return this._temperature;
  },
  set temperature(temperature){
    this._temperature = temperature;
  },
  get celsius(){
    return this._celsius;
  },
  set celsius(celsius){
    this._celsius = celsius;
  },
  get icon(){
    return this._icon;
  },
  set icon(icon){
    this._icon = icon;
  },
  get description(){
    return this._description;
  },
  set description(description){
    this._description = description;
  },
  get wind(){
    return this._wind;
  },
  set wind(wind){
    this._wind = wind;
  },
  get humidity(){
    return this._humidity;
  },
  set humidity(humidity){
    this._humidity = humidity;
  }
}
  
//VIEW
const weatherView = {

  get box(){
    return this._box;
  },

  set box(box){
    this._box = box;
  },
  get desc(){
    return this._desc;
  },

  set desc(desc){
    this._desc = desc;
  },
  get humidity(){
    return this._humidity;
  },

  set humidity(humidity){
    this._humidity = humidity;
  },
  get icon(){
    return this._icon;
  },

  set icon(icon){
    this._icon = icon;
  },
  
  get loader(){
    return this._loader;
  },

  set loader(loader){
    this._loader = loader;
  },
  
  get location(){
    return this._location;
  },

  set location(location){
    this._location = location;
  },
  get temperature(){
    return this._temperature;
  },

  set temperature(temperature){
    this._temperature = temperature;
  },
  
  get wind(){
    return this._wind;
  },

  set wind(wind){
    this._wind = wind;
  },

  init(){  

    this.box = document.getElementById('weather-box');  
    this.desc = document.getElementById('desc');
    this.humidity = document.getElementById('humidity');
    this.icon = document.getElementById('weather-icon');
    this.loader = document.getElementById('loader');
    this.location = document.getElementById('location');
    this.temperature = document.getElementById('temp');
    this.wind = document.getElementById('wind');
    
    controller.init();
      
    this.temperature.addEventListener('click', e => controller.toggleTempUnit());
      
    },

  setLocationContent(location){
    this.location.textContent = location;
  },
  setTemperatureContent(temperature){  
    this.temperature.textContent = temperature;
  },
  setIconSRC(url) {
    this.icon.src = url;
  },
  setDescContent(desc){
    this.desc.textContent = desc;
  },
  setHumidityContentContent(humidity){
    this.humidity.textContent = `Humidity: ${humidity} %`;
  },
  setWindContent(wind){
    this.wind.textContent = `Wind: ${wind} Km/h`;
  },
  removeLoader(){
    this.loader.classList.remove('loader');
    this.loader.classList.add('loader--hide');
    this.box.classList.remove('weather-box--hide');
    this.box.classList.add('weather-box');
  }
}
//CONTROLLER
const controller = {
  
  init(){
    this.findMe();
  },

  findMe(){
    const convertResponseToJSON = response => response.json();

    const setWeatherData = data =>{   
      model.location = data.name;
      model.temperature = Math.round(data.main.temp);
      model.icon = data.weather[0].icon;
      model.description = data.weather[0].description;
      model.wind = data.wind.speed;
      model.humidity = data.main.humidity;
    }

    const setWeatherDataIntoView = () =>{
      weatherView.setLocationContent(model.location);
      weatherView.setTemperatureContent(`${model.temperature} ºC`);
      weatherView.setIconSRC(model.icon);
      weatherView.setDescContent(model.description);
      weatherView.setWindContent(model.wind);
      weatherView.setHumidityContentContent(model.humidity);
    }

    const hideLoader = () => weatherView.removeLoader();

    const success = ({coords}) => {
      const {latitude, longitude} = coords;
                
      fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
      .then(convertResponseToJSON)
      .then(setWeatherData)     
      .then(setWeatherDataIntoView)    
      .then(hideLoader)  
    }

    const error = () => alert('Unable to retrieve your location');
    

    if (!navigator.geolocation) {
      weatherView.location.textContent = 'Geolocation is not supported by your browser';
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  },

  //mexer nessa funcao
  
  toggleTempUnit(){

    const unitStr = model.isCelsius? 'ºF' : "ºC"
    const toggledTemp = model.isCelsius? this.convertCelsiusToFahrenheit(model.temperature) : model.temperature
    const roundedTempValue = Math.round(toggledTemp);

    weatherView.setTemperatureContent(`${roundedTempValue} ${unitStr}`);
    model.toggleCelsius();
  },

  convertCelsiusToFahrenheit(temperature){
    return (temperature*9/5)+32;
  }  
}

weatherView.init();
  
   
  
  