const axios = require("axios");
const dotenv = require("dotenv").config();

const app_id = process.env.API_ID;
const app_key = process.env.API_KEY;
const endpoint = "entries";
const language = "en-us";

const word = process.argv[2];
axios.defaults.headers.common["app_id"] = app_id;
axios.defaults.headers.common["app_key"] = app_key;

const url = `https://od-api.oxforddictionaries.com/api/v2/${endpoint}/${language}/${word}`;

const translation = async (url) => {
  try {
    const { data } = await axios.get(url);

    const wordType = data.results[0].lexicalEntries[0].lexicalCategory.text;
    const definitions =
      data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];

    console.log(
      `${word} (${wordType}) \nDefinitions: ${definitions} \nProvided by: Oxford University Press`
    );
  } catch (error) {
    console.log("Sorry! We can not find your word!");
  }
};

translation(url);
