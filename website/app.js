// declaring global variables
const generate = document.querySelector("#generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const key = "&appid=fd1eb9b200bc479e6fee5cf48535dc56&units=imperial";
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const city = document.getElementById("city");
const date = document.getElementById("date");
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const requestForm =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code}&appid={API key}";
let d = new Date();
let newDate = d.toDateString();
//create click event fot generate button
generate.addEventListener("click", (e) => {
  e.preventDefault();
  const madeURL = `${baseURL}${zip.value},${key}`;
  getData(madeURL).then((data) => {
    cureData(data).then((info) => {
      postData("/add", info).then((data) => {
        retreiveData("/all").then((data) => {
          updateUI(data);
        });
      });
    });
  });
});
//getting the data
const getData = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    if (data.cod == 200) {
      console.log(data);
      return data;
    } else {
      console.log(data.message);
      return data;
    }
  } catch (Error) {
    console.error;
  }
};

//cure data that coming from the api
const cureData = async (data) => {
  try {
    if (data.message) {
      return data;
    }

    const info = {
      date: newDate,
      city: data.name,
      feelings: feelings.value,
      temp: data.main.temp,
    };

    return info;
  } catch (e) {
    console.log(e);
  }
};
// post data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
  }
};
//retreive data
const retreiveData = async (url) => {
  const data = await fetch(url);
  try {
    const response = await data.json();
    return response;
  } catch (err) {
    console.error(err);
  }
};

// setting up the UI for the data
const updateUI = async (data) => {
  const response = await data;
  if (response.date) {
    document.querySelector("#entryHolder").style.display = "block";
    city.innerHTML = response.city;
    date.innerHTML = response.date;
    temp.innerHTML = response.temp;
    content.innerHTML = response.feelings
      ? response.feelings
      : "What do you feel?!!";

    document.querySelector("#error").style.display = "none";
    document.querySelector("#error").innerHTML = response.message;
  } else {
    document.querySelector("#entryHolder").style.display = "none";
    document.querySelector("#error").style.display = "block";
    document.querySelector("#error").innerHTML = response.message;
  }
};
