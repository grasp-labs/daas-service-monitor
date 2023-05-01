const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/lambda', async (_req, res) => {
  // const response = await axios.get('https://ollq6b7h96.execute-api.eu-north-1.amazonaws.com/ev/monitor/lambda/', config);
  // console.log(response);
  const config = {
    method: 'get',
    url: 'https://ollq6b7h96.execute-api.eu-north-1.amazonaws.com/dev/monitor/lambda',
    headers: {
      Content_Type: 'application/json',
      // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'x-api-key': process.env.REACT_APP_API_KEY,
      Accept: 'application/json',
    },
  };

  await axios.request(config).then((response) => {
    res.json(response.data.body);
    console.log(response.data.body);
  }).catch((error) => {
    console.error(error);
  });
});

app.listen(8000, () => console.log(`server is running on port ${PORT}`));
