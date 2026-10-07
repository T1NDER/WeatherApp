require("dotenv").config();

module.exports = {
  API_TOKEN: process.env.WEATHERSTACK_API_KEY || "",
  CITY: process.env.CITY || "New York",
  API_URL:
    process.env.WEATHERSTACK_API_URL || "http://api.weatherstack.com/current",
};
