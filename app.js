// const express = require('express');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const cors = require('cors');
// const dataset = require('./movie-dataset.js');
// const { json } = require('express');
// require('dotenv').config();


// const app = express();


// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors());
// app.use(function validateBearerToken(req, res, next) {
//   const authToken = req.get('Authorization');
//   const apiToken = process.env.API_TOKEN;
// //   console.log(apiToken);
// //   console.log('validate bearer token middleware')

//   if (!authToken || authToken.split(' ')[1]  !== apiToken) {
//     // console.log('Im inside');
//     return res.status(401).json({error: 'Unauthorized request' });
//   }
//   next();
// });

// app.get('/movie', (req, res) => {
//   let searchType = '';
//   let searchTerm = '';

//   const searchGenre = req.query.genre;
//   const searchCountry = req.query.country;
//   const searchAvg_vote = req.query.avg_vote;

//   if (req.query.genre && req.query.genre !== undefined) {
//     searchType = 'genre';
//     searchTerm = searchGenre.toLowerCase();
//   }
//   if (req.query.country && req.query.country !== undefined) {
//     searchType = 'country';
//     searchTerm = searchCountry.toLowerCase();
//   }
//   if (req.query.avg_vote && req.query.avg_vote !== undefined) {
//     searchType = 'avg_vote';
//     searchTerm = searchAvg_vote.toLowerCase();
//   }
// //   console.log(`searchTerm: ${searchTerm}, searchType: ${searchType}`);

//   let results = dataset;

//   const ifQuery = function (queryName) {
//     if (req.query[queryName] && req.query[queryName] !== undefined) {
//       return true;
//     }
//     return false; 
//   };

//   const querySort = function () {
//     if (ifQuery('genre')) {
//       results = results.map((element, index) => element.genre.toLowerCase() === searchGenre.toLowerCase() ? console.log(results.splice(index))  : console.log('Didn\'t splice'));
//     }
//     if (ifQuery('country')) {
//       console.log('country');
//     }
//     if (ifQuery('avg_vote')) {
//       console.log('avg_vote');
//     }
//   };

//   querySort();

//   // if (searchType === 'avg_vote') {
//   //   results = dataset.filter(element => element[searchType] >= searchTerm);
//   // } else {
//   //   results = dataset.filter(
//   //     (element) => element[searchType].toLowerCase().includes(searchTerm)
//   //   );
//   // }

//   res.status(200).send(results);
// });

// app.listen(8080, () => {
//   console.log('Listening on 8080!');
// });

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIES = require('./movie-dataset.js')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

// app.use(function validateBearerToken(req, res, next) {
//   const apiToken = process.env.API_TOKEN
//   const authToken = req.get('Authorization')
//   if (!authToken || authToken.split(' ')[1] !== apiToken) {
//     return res.status(401).json({ error: 'Unauthorized request' })
//   }
//   next()
// })

app.get('/movie', function handleGetMovie(req, res) {
  let response = MOVIES;

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }

  if (req.query.avg_vote) {
    response = response.filter(movie =>
      Number(movie.avg_vote) >= Number(req.query.avg_vote)
    )
  }

  res.json(response)
})

module.exports = app;