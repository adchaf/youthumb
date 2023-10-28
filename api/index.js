const express = require('express');
const request = require('request');
const { Readable } = require('stream');
const app = express();
const cors = require('cors'); // Import the cors module

app.use(cors())

app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
  res.end("[]")
});

app.get('/api/image', (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    res.status(400).json({ error: 'Image URL is missing' });
    return;
  }

  // Use the `request` module to fetch the image from the URL
  request.get(imageUrl, { encoding: null }, (error, response, body) => {
    if (error) {
      res.status(500).json({ error: 'Failed to download the image' });
      return;
    }

    if (response.statusCode !== 200) {
      res.status(response.statusCode).json({ error: `Image URL responded with status code ${response.statusCode}` });
      return;
    }

    const imageBuffer = Buffer.from(body);

    // Create a readable stream from the image buffer
    const imageStream = new Readable();
    imageStream.push(imageBuffer);
    imageStream.push(null);

    // Set the response headers to indicate it's an image
    res.setHeader('Content-Type', 'image/jpeg'); // Change the content type as needed

    // Pipe the image stream to the response
    imageStream.pipe(res);
  });
});

module.exports = app
