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

app.listen(8000, () => (`server is running on port ${PORT}`));
