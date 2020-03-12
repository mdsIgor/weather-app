//model
let model = {
    location: null,
    temperature: null,
    celsius: true,
    
    setLocation: function(location){
      this.location = location;
    },
    
    setTemperature: function(temperature){
      this.temperature = temperature;
    },
    
    getLocation: function(){
      return this.location;
    },
    
  
    getTemperature: function(){
      return this.temperature;
    },
    
    setCelsiusTrue: function(){
      this.celsius = true;
    },
    
    setCelsiusFalse: function(){
      this.celsius = false;
    },
    getCelsius: function(){
       return this.celsius;
    }
    
  }
  
  //view
  let weatherView = {
     init: function(){  
       this.box = document.getElementById('weather-box');
       this.loader = document.getElementById('loader');
       this.location = document.getElementById('location');
       this.temperature = document.getElementById('temp');
       this.icon = document.getElementById('weather-icon');
       this.desc = document.getElementById('desc');
       this.humidity = document.getElementById('humidity');
       this.wind = document.getElementById('wind');
      
       controller.init();
       
       this.temperature.addEventListener('click', function(e){
          controller.toggleTempUnit();
       });
       
     },
    setLocationContent: function(location){
      this.location.textContent = location;
    },
    setTemperatureContent: function(temperature){
      
      this.temperature.textContent = temperature;
    },
    setIcon: function(url) {
      this.icon.src = url;
    },
    setDesc: function (desc){
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
  //controller
  let controller = {
    init: function(){
      this.findMe();
    },
    findMe: function() {
        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
           
          
          fetch('https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude)
          .then(response => response.json())
          .then((data) => {
            console.log(data);
            
            model.setLocation(data.name);
            model.setTemperature(Math.round(data.main.temp));
            
            weatherView.setLocationContent(model.getLocation());
            weatherView.setTemperatureContent(model.getTemperature() + ' ºC');
            weatherView.setIcon(data.weather[0].icon);
            weatherView.setDesc(data.weather[0].description);
            weatherView.setWind(data.wind.speed);
            weatherView.setHumidity(data.main.humidity);
            
            weatherView.removeLoader();
            
          });
  
        }
      
        function error() {
          alert('Unable to retrieve your location');
        }
  
        if (!navigator.geolocation) {
           weatherView.location.textContent = 'Geolocation is not supported by your browser';
        } else {
           navigator.geolocation.getCurrentPosition(success, error);
        }
    },
    
    
    
    toggleTempUnit: function(){
      
      if(model.getCelsius()){
        model.setCelsiusFalse();
        weatherView.setTemperatureContent(Math.round(this.convertFromCelsius(model.getTemperature())) +' ºF');
      } else {
        weatherView.setTemperatureContent(Math.round(model.getTemperature()) + ' ºC');
        model.setCelsiusTrue();
      }
      
    },
    
    convertFromCelsius: function(temperature){
      return (temperature*9/5)+32;
    }  
    
  }
  
  weatherView.init();
  
   
  
  