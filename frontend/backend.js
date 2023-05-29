/**
 * This file contains set of instructinos and libraries for hiding Api key.
 * The idea is to handle api call through backend file instead of frontend file.
 * In this way, api key is hidden that is not seen by the users when they do inspect.
 * Here we will access to the api key which is saved in environment variable called .env
 * and copy the url given in frontend file here. instead, we use 'http://localhost:8000/lambda'
 * in frontend and delete the api key that front end code does not have direct access to that.
 */
const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/lambda', async (_req, res) => {
  try {
    const config = {
      method: 'get',
      url: 'https://ollq6b7h96.execute-api.eu-north-1.amazonaws.com/dev/monitor/lambda',
      headers: {
        Content_Type: 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
        Accept: 'application/json',
      },
    };

    const response = await axios.request(config);
    res.json(response.data.body);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.listen(`${PORT}`, () => (`server is running on port ${PORT}`));
