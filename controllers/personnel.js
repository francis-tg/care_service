const { Op } = require("sequelize")
const db = require("../models")

module.exports = {
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next
     */
    async getPersonnel(req, res, next) {
        try {
            const personnels = await db.User.findAll({ where: { name: { [Op.not]: 'Admin User' } }, raw: true })
            return res.render("personnel", { personnels })
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
    async createPersonnel(req, res, next) {
        try {
            const {name,contact,lastname,email} = req.body;
            const userRole = await db.Role.findOne({ where: { name: 'Technician' } });
            const user = await db.User.create({ name, email,lastname,contact, password:contact });
            await user.addRole(userRole);
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
    async updatecreatePersonnel(req, res, next) {
        try {
            const {name,contact,lastname,email} = req.body;
            const {id} = req.id;
            await db.User.update({ name, email,lastname,contact},{where:{id}});
            return res.redirect(req.headers.referer)
        } catch (error) {
            next(error)
        }
    }
}