it('sanity', () => {
  console.log(process.env.DB_ENV)
  expect(true).toBe(true);
})

const Beer = require('./beers-model')
const db = require('./../../data/dbConfig');

const Guinness = { name: 'Guinness', brand_id: 1, style_id: 1, abv: 4.2 }
const Bud = { name: 'Budweiser', brand_id: 2, style_id: 2, abv: 5.0 }

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
})
beforeEach(async () => {
  await db('beers').truncate();
})
afterAll(async () => {
  await db.destroy();
})

describe('beers model', () => {
  it('get returns empty array if no beers', async () => {
    const result = await Beer.get()
    expect(result).toHaveLength(0);
  })
  it('get returns beers', async () => {
    await db('beers').insert(Guinness)
    const result = await Beer.get();
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(Guinness);
    expect(result[0]).toHaveProperty('name', 'Guinness')
  })
  it('insert inserts a new beer', async () => {
    await Beer.insert(Bud)
    await Beer.insert(Guinness)

    const result = await Beer.get();

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject(Bud);
    expect(result[0]).toHaveProperty('name', 'Budweiser')
    expect(result[1]).toMatchObject(Guinness);
    expect(result[1]).toHaveProperty('name', 'Guinness')
  })
  it('remove removes a beer at id', async () => {
    await db('beers').insert(Guinness)
    await db('beers').insert(Bud)
    let result = await Beer.get();
    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject(Guinness);
    await Beer.remove(1);
    result = await Beer.get();
    expect(result[0]).toMatchObject(Bud);
    expect(result).toHaveLength(1);
  })
})