const request = require('supertest');
const beerRouter = require('./beers-router');
const server = require('./../server');
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
  describe('[GET] /beers', () => {
    it('responds with 200 OK', async () => {
      const response = await request(server).get('/beers');
      expect(response.status).toBe(200);
    })
    it('responds with empty array if no beers', async () => {
      const response = await request(server).get("/beers");
      expect(response.body).toHaveLength(0);
    })
    it("responds with beers if beers", async () => {
      await db("beers").insert(Bud);
      let response = await request(server).get("/beers");
      expect(response.body).toHaveLength(1);
      await db("beers").insert(Guinness);
      response = await request(server).get("/beers");
      expect(response.body).toHaveLength(2);
    });
  })
  describe("[POST] /beers", () => {
    it('returns newly created hobbit', async () => {
      let response = await request(server).post('/beers').send(Merry);
      expect(response.body.name).toBe('Merry')
      expect(response.body.id).toBe(1)
    })
    it('if we ad same hobbit twice responds with "not cool zeus"', async () => {
      await request(server).post('/beers').send(Merry);
      const res = await request(server).post('/beers').send(Merry);
      expect(JSON.stringify(res.body)).toMatch(/not cool/);
    })
  })
})