const https = require('https');
const fs = require('fs');
const express = require('express');

const axios = require('axios');
const app = express();
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

https.createServer(options, app).listen(443, () => {
  console.log('Running on HTTPS port 443');
});

app.get('/students', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching posts');
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));
