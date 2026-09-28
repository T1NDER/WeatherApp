require("dotenv").config();
const http = require("http");

const apiKey = process.env.OPENWEATHER_API_KEY;
const city = "New York";
const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

http
  .get(url, (apiRes) => {
    let data = "";

    apiRes.on("data", (chunk) => {
      data += chunk;
    });

    apiRes.on("end", () => {
      try {
        const response = JSON.parse(data);

        if (response.error) {
          console.error("❌ Ошибка API:", response.error.info);
        } else {
          console.log(`Город: ${response.location.name}`);
          console.log(`Температура: ${response.current.temperature}°C`);
          console.log(`Описание: ${response.current.weather_descriptions[0]}`);

          // console.log(JSON.stringify(response, null, 2)); - Можно сделать вывод всего объекта в формате JSON
          // console.dir(response, { depth: null, colors: true }); - Можно сделать красивый вывод всего объекта в формате JSON
        }
      } catch (err) {
        console.error("Ошибка парсинга JSON:", err);
        console.log("Сырые данные:", data);
      }
    });
  })
  .on("error", (err) => {
    console.error("Ошибка сетевого запроса:", err.message);
  });
