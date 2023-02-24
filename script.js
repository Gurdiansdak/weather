let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`


let $currentTemp = document.querySelector(".temp")
let $currentDescription = document.querySelector("#description")
let $descriptionIcon = document.querySelector('#descriptionIcon')
let $currentMaxTemp = document.querySelector('#maxTemp')
let $currentMinTemp = document.querySelector('#minTemp')
let $hours = document.querySelector('.hours')
let $daily = document.querySelector('.daily')

fetch(url)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)

        $currentTemp.textContent = data.current.temp.toFixed(0) + '°'
        $currentDescription.textContent = data.current.weather[0].description
        $descriptionIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`)
        $currentMaxTemp.textContent = 'Макс.:' + data.daily[0].temp.max.toFixed(0) + ',';
        $currentMinTemp.textContent = 'min.:' + data.daily[0].temp.min.toFixed(0);

        data.hourly.forEach((element, index) => {
            let hour =  new Date().getHours() + index
            if (index < 24){
                $hours.insertAdjacentHTML('beforeend', `
                <div>
                    <p>${index  ==  0  ?  'Сейчас'  :  hour < 24  ?  hour  :  hour - 24 * Math.floor(hour/24)}</p>
                    <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"
                    <p>${element.temp.toFixed(0)}°</p>
                </div>
                `)
            }
            
        });

    })


fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
    console.log(data);

    data.daily.forEach((day, index) => {
      if (index > 0) {
        let date = new Date(day.dt * 1000);
        let dayOfWeek = date.toLocaleDateString("ru", { weekday: "long" });
        console.log(date.toLocaleDateString("ru", { weekday: "long" }))
        let weatherIcon = day.weather[0].icon;
        let maxTemp = day.temp.max.toFixed(0);
        let minTemp = day.temp.min.toFixed(0);

        $daily.insertAdjacentHTML(
          "beforeend",
          `
          <div class="days">
          <div>
            <p>${dayOfWeek}</p>
          </div>
          <div>
            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png">
          </div>
          <div>
            <p>${maxTemp}° ----- ${minTemp}°</p>
          </div>
          </div>
        `
        );
      }
    });
  });

