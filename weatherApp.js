const http = require("http");
const config = require("./config");

const city = process.argv[2] || config.CITY;

if (!config.API_TOKEN) {
  console.error("Ошибка: Отсутствует API токен.");
  process.exit(1);
}

const url = `${config.API_URL}?access_key=${config.API_TOKEN}&query=${encodeURIComponent(city)}`;

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
          console.error(`❌ Ошибка API (${response.error.code}):`, response.error.info);
        } else {
          console.log(`Город: ${response.location.name}`);
          console.log(`Температура: ${response.current.temperature}°C`);
          console.log(`Описание: ${response.current.weather_descriptions[0]}`);

          // console.log(JSON.stringify(resфponse, null, 2)); - Можно сделать вывод всего объекта в формате JSON
          // console.dir(response, { depth: null, colors: true }); - Можно сделать красивый вывод всего объекта в формате JSON
        }
      } catch (err) {
        console.error("Ошибка парсинга JSON:", err.message);
        console.log("Сырые данные:", data);
      }
    });
  })
  .on("error", (err) => {
    console.error("Ошибка сетевого запроса:", err.message);
  });