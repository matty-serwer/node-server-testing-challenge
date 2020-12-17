const db = require("../../data/dbConfig");

module.exports = {
  get() {
    return db("beers");
  },
  getById(id) {
    const beerObject = db("beers").where({ id }).first();
    if (!beerObject) {
      return null;
    } else {
      return beerObject;
    }
  },
  insert(beer) {
    return db("beers")
      .insert(beer)
      .then(([id]) => {
        return db("beers").where("id", id);
      });
  },
  async remove(id) {
    return db("beers").where("id", id).del()
  },
};
