var express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const db = require('../models');
const { Op } = require('sequelize');
var router = express.Router();

/* GET users listing. */
router.get('/intervention',ensureAuthenticated, async function(req, res, next) {
 try {
   const interventions = await db.Intervention.findAll({where:{[Op.and]:[{technician_id:req.user.id},{status:{[Op.not]:'Refusé'}}]},include:['technician','Issue'],raw:true,nest:true})
   console.log(interventions)
   return res.render('intervention/technician',{interventions})
 } catch (error) {
  next(error)
 }
});

router.get('/intervention/:id/close',ensureAuthenticated,async function(req,res,next){
  try {
    const {id} =req.params
    await db.Intervention.update({status:'Refusé',technician_id:null},{where:{id}})
    return res.status(200).redirect(req.headers.referer)
  } catch (error) {
    next(error)
  }
})
router.get('/intervention/:id/accept',ensureAuthenticated,async function(req,res,next){
  try {
    const {id} =req.params
    await db.Intervention.update({status:'Accepté',technician_id:req.user.id},{where:{id}})
    return res.status(200).redirect(req.headers.referer)
  } catch (error) {
    next(error)
  }
})
router.get('/intervention/:id/start',ensureAuthenticated,async function(req,res,next){
  try {
    const {id} =req.params
    await db.Intervention.update({status:'En cours',technician_id:req.user.id},{where:{id}})
    return res.status(200).redirect(req.headers.referer)
  } catch (error) {
    next(error)
  }
})
router.get('/intervention/:id/end',ensureAuthenticated,async function(req,res,next){
  try {
    const {id} =req.params
    await db.Intervention.update({status:'Terminé',technician_id:req.user.id},{where:{id}})
    return res.status(200).redirect(req.headers.referer)
  } catch (error) {
    next(error)
  }
})
module.exports = router;
