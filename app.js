const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dataset = require('./movie-dataset.js');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
// app.use(function validateBearerToken(req,rex,next){})

app.get('/movie', (req, res) => {
  const searchGenre = res.query.genre.toLowerCase();
  const searchCountry = res.query.country.toLowerCase();
  const searchAvg_vote = res.query.avg_vote.toLowerCase();

  const results = dataset.filter(element => element.genre !== searchGenre);

  res.status(200).send(results);
});

app.listen(8000, () => {
  console.log('Listening on 8000!');
});
