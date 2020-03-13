//MODEL
const model = {  
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
  },
    
  setCelsiusTrue(){
    this.celsius = true;
  },
      
  setCelsiusFalse(){
    this.celsius = false;
  }
}
  
//VIEW
const weatherView = {
    
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
  setIcon(url) {
    this.icon.src = url;
  },
  setDesc(desc){
    this.desc.textContent = desc;
  },
  setHumidity(humidity){
    this.humidity.textContent = 'Humidity: ' + humidity + '%';
  },
  setWind(wind){
    this.wind.textContent = 'Wind: ' + wind + ' Km/h';
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
      //initial temp unity
      model.celsius = true; 
    }

    const setWeatherDataIntoView = () =>{
      weatherView.setLocationContent(model.location);
      weatherView.setTemperatureContent(model.temperature + ' ºC');
      weatherView.setIcon(model.icon);
      weatherView.setDesc(model.description);
      weatherView.setWind(model.wind);
      weatherView.setHumidity(model.humidity);
    }

    const hideLoader = () => weatherView.removeLoader();

    const success = position => {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
                
      fetch('https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude)
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
  
  toggleTempUnit(){
    if(model.celsius){        
      model.setCelsiusFalse();
      weatherView.setTemperatureContent(Math.round(this.convertFromCelsius(model.temperature)) +' ºF');
    } else {
      weatherView.setTemperatureContent(Math.round(model.temperature) + ' ºC');
      model.setCelsiusTrue();
    }
  },

  convertFromCelsius(temperature){
    return (temperature*9/5)+32;
  }  
}

weatherView.init();
  
   
  
  