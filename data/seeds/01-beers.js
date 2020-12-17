
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('beers').del()
    .then(function () {
      // Inserts seed entries
      return knex('beers').insert([
        {name: 'Guinness', brand_id: 1, style_id: 1, abv: 4.2},
        {name: 'Bud', brand_id: 2, style_id: 2, abv: 5.0},
      ]);
    });
};
