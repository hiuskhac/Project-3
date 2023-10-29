// Personal API Key for OpenWeatherMap API
const apiKey = "6c45d31bf818674192929b08f1232417&units=imperial";
async function callOpenWeatherAPI(zip) {
  const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;

  try {
    const response = await fetch(openWeatherURL);

    if (response.ok) {
      const weatherData = await response.json();
      return weatherData;
    } else {
      throw new Error("Call OpenWeatherMap API Failure.");
    }
  } catch (error) {
    console.error(error);
  }
}

async function postDataToServer(zip, feelings) {
  const weatherData = await callOpenWeatherAPI(zip);

  const projectData = {
    zip: zip,
    feelings: feelings,
    weatherData: weatherData,
  };

  try {
    const response = await fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });

    if (response.ok) {
      const updatedProject = await response.json();
    } else {
      throw new Error("Something wrong.");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getData() {
  try {
    const response = await fetch("http://localhost:3000/projectData");
    if (response.ok) {
      const projectData = await response.json();
      console.log(projectData);
      const temperature = Math.round(projectData?.weatherData?.main?.temp);
      const date = new Date(
        projectData?.weatherData?.dt * 1000
      ).toLocaleString();
      const feelings = projectData?.feelings;
      document.getElementById("temp").innerHTML = temperature + " degrees";
      document.getElementById("content").innerHTML = feelings;
      document.getElementById("date").innerHTML = date;
    } else {
      throw new Error("Cannot send data to server.");
    }
  } catch (error) {
    console.error(error);
  }
}

document.querySelector("#generate").addEventListener("click", async () => {
  const zip = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;
  if (zip) {
    await postDataToServer(zip, feelings);
    await getData();
  }
});
