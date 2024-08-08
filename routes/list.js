const express = require('express');
const { List, Card } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, async (req, res) => {
  const { name, boardId } = req.body;
  try {
    const list = await List.create({ name, boardId });
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findByPk(id, { include: 'cards' });
    res.json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', ensureAuthenticated, async (req, res) => {

    try {
      const list = await List.findAll( { include: 'cards',raw:true });
      res.json(list);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;
