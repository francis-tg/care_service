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
            const role = await db.Role.findOne({where:{name:'Technician'},raw:true})
            const personnels = await db.User.findAll({
                include: {
                  model: db.Role,
                  as: 'roles',
                  through: { attributes: [] }, // Exclut les attributs de la table de liaison
                  where: { id: role?.id } // Filtre par l'ID du rôle
                },
                raw: true,
                nest: true // Utilisé pour un format de résultat imbriqué
              });
            return res.render("personnel", { personnels })
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
    async getUsers(_req, res, next) {
        try {
            const role = await db.Role.findOne({where:{name:'User'},raw:true})
            const users = await db.User.findAll({
                include: {
                  model: db.Role,
                  as: 'roles',
                  through: { attributes: [] }, // Exclut les attributs de la table de liaison
                  where: { id: role?.id } // Filtre par l'ID du rôle
                },
                raw: true,
                nest: true // Utilisé pour un format de résultat imbriqué
              });
            return res.render("personnel/user", { users })
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