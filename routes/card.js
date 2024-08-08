const express = require('express');
const { Card } = require('../models');
const { ensureAuthenticated } = require('../middleware/auth');
const { ValidateField } = require('../middleware/validation');
const db = require('../models');

const router = express.Router();

router.post('/', ensureAuthenticated,ValidateField, async (req, res) => {
  const { title, description, listId } = req.body;
  try {
    const card = await Card.create({ title, description, listId });
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/assign',ensureAuthenticated,ValidateField,async(req,res)=>{
    try {
        const {personnel,task} = req.body
        await db.BoardMember.create({})
    } catch (error) {
        
    }
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    res.json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
      const card = await Card.findAll({raw:true});
      res.json(card);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

module.exports = router;
