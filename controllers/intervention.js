const { Op } = require("sequelize")
const db = require("../models")

module.exports = {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     */
    async createIntervention(req, res, next) {
        try {
            if (req.user.role === 'Admin') {
                const { issue_id, technician_id } = req.body
                await db.Intervention.create({ issue_id, technician_id,status:"En attente" })
                return res.status(201).redirect(req.headers.referer)
            } else {
                return res.status(401).redirect(req.headers.referer)
            }
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
    async getIntervention(_req, res, next) {
        try {
            const issues = await db.Issue.findAll({raw:true})
            const users = await db.User.findAll({ where: { name: { [Op.not]: 'Admin User' } }, raw: true })
            const interventions = await db.Intervention.findAll({ raw: true,include:['technician','Issue'] })
            return res.render("intervention", { interventions,issues,users })
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
    async updateIntervention(req, res, next) {
        try {
            if (req.user.role === 'Admin') {
                const {id} = req.params
                await db.Intervention.update({ ...req.body },{where:{id}})
                return res.redirect(req.headers.referer)
            } else {
                return res.status(401).redirect(req.headers.referer)
            }
        } catch (error) {
            next(error)
        }
    },


}