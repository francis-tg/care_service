const express = require('express');
const { Board, List, Card } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, async (req, res) => {
  const { name, description } = req.body;
  try {
    const board = await Board.create({ name, description, userId: req.user.id });
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const boards = await Board.findAll({ where: { userId: req.user.id }, include: 'lists' });
    res.render('board',{boards})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const board = await Board.findByPk(id, { include: [{ model: List, as: 'lists', include: 'cards' }] });
    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
