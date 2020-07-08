const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('movie app', () => {
  it('should return a message from GET /', () => {
    return supertest(app).get('/movie').expect(200);
  });
});

describe('movie app', () => {
  it('should return an array of objects with the keys genre, country and avg_vote', () => {
    const query = {
      genre: 'comedy',
      country: 'italy',
      avg_vote: 5,
    };
    const expected = {
      filmtv_ID: 20,
      film_title: 'A che servono questi quattrini?',
      year: 1942,
      genre: 'Comedy',
      duration: 85,
      country: 'Italy',
      director: 'Esodo Pratelli',
      actors:
        'Eduardo De Filippo, Peppino De Filippo, Clelia Matania, Paolo Stoppa',
      avg_vote: 5.9,
      votes: 12,
    };
    return supertest(app)
      .get('/movie')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body[0]).to.have.any.keys('genre', 'country', 'avg_vote');
        expect(res.body[0]).to.eql(expected);
      });
  });
});
