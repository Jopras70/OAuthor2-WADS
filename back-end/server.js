const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Endpoint for receiving Facebook authentication data
app.post('/oauth2-app', (req, res) => {
  const { accessToken } = req.body;

  // Call Facebook API to get user data based on accessToken
  axios
    .get(`https://graph.facebook.com/v14.0/me?fields=id,name,picture&access_token=${accessToken}`)
    .then((response) => {
      const profile = response.data;
      res.json(profile);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to authenticate with Facebook' });
    });
});

// Run the server on a specific port
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
