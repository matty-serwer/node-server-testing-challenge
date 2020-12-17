const request = require('supertest');
const beerRouter = require('./beers-router');
const db = require('./../../data/dbConfig');

const Guinness = { name: 'Guinness', brand_id: 1, style_id: 1, abv: 4.2 }
const Bud = { name: 'Budweiser', brand_id: 2, style_id: 2, abv: 5.0 }

it('sanity', () => {
  console.log(process.env.DB_ENV)
  expect(true).toBe(true);
})

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("beers").truncate();
});
afterAll(async () => [await db.destroy()]);

describe('endpoints', () => {
  
})