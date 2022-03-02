async function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      // probably rename successCallback to something more fitting like getCoordinatesFromPosition or something
      resolve(getPos(position));
    }, reject);
  });
  function getPos(position) {
    return [position.coords.latitude, position.coords.longitude];
  }
}

const position = async () => console.log(await getLocation());

const getPosBtn = document.querySelector("#getPosBtn");

async function getWeather(coord) {
  coord = await coord;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=e1f6c7a0e6d30021761377189e31aa90
`;

  const climaData = await fetch(url, {
    mode: "cors",
  });
  const clima = await climaData.json();
  await setHTML(clima.weather[0].main, clima.name, clima.main.temp - 273.15);
  console.log(clima);
}
getWeather(getLocation());

async function setHTML(clima, ciudad, temperaturaK) {
  const climaH = document.querySelector("#clima");
  const ciudadH = document.querySelector("#ciudad");
  const tempH = document.querySelector("#temp");
  const imgClimaH = document.querySelector(".imgClima");

  climaH.innerHTML += clima;
  ciudadH.innerHTML += ciudad;
  tempH.innerHTML += temperaturaK.toFixed(2);

  const images = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=z1dptOmPp1uaoQyQM6fli2bJcYLwMzsM&q=${clima}&limit=20&offset=0&rating=g&lang=en`,
    {
      mode: "cors",
    }
  );
  const gif = await images.json();
  console.log(gif);
  imgClimaH.setAttribute(
    "style",
    `background-image:url("${
      gif.data[Math.floor(Math.random() * (19 - 0)) + 0].images.original.url
    }")`
  );
}
