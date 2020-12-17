const express = require("express");
const router = express.Router();
const Beer = require('./beers-modal');

router.get('/', (req, res) => {
  Beer.get()
    .then(beers => {
      res.json(beers)
    })
    .catch(e => {
      res.status(500).json({ message: e.message })
    })
})

router.post('/', (req, res) => {
  const beerData = req.body
  Beer.insert(beerData)
    .then(beer => {
      res.status(201).json(beer);
    })
    .catch(e => {
      res.status(500).json({ message: e.message })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Beer.remove(id)
    .then(removed => {
      if(removed) {
        res.json(removed)
      } else {
        res.status(404).json({ message: 'Could not find beer with that id' })
      }
    })
    .catch(e => {
      res.status(500).json({ message: e.message })
    })
})

module.exports = router;