const db = require("../models")

module.exports = {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async createIssue(req,res,next){
        try {
            const {name,description,end,location} = req.body
            await db.Issue.create({name,description,location,end,user_id:req.user.id})
            return res.status(201).redirect(req.headers.referer)
        } catch (error) {
            next(error)
        }
    },
    /**
     * 
     * @param {import("express").Request} _req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async getIssue(_req,res,next){
        try {
            const issues = await db.Issue.findAll({raw:true,include:["User"]})
            return res.render("issue",{issues})
        } catch (error) {
            next(error)
        }
    },
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async updateIssue(req,res,next){
        try {
            const {id} = req.params
            await db.Issue.update({...req.body},{where:{id}})
            return res.redirect(req.headers.referer)
        } catch (error) {
            next(error)
        }
    },
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async deleteIssue(req,res,next){
        try {
            const {id} = req.params
            await db.Issue.destroy({where:{id}})
            return res.redirect(req.headers.referer)
        } catch (error) {
            next(error)
        }
    },
}