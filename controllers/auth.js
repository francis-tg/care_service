const passport = require("passport")
const db = require("../models")
module.exports = {
    /**
     * 
     * @param {import("express").Request} _req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     * @returns 
     */
    loginController(_req, res, next) {
        try {

            return res.render("auth/login", { layout: false })
        } catch (error) {
            return next(error)
        }
    },
    /**
     * 
     * @param {import("express").Request} _req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     * @returns 
     */
    registerController(_req, res, next) {
        try {

            return res.render("auth/register", { layout: false })
        } catch (error) {
            return next(error)
        }
    },
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     * @returns 
     */
    async createAccountController(req, res, next) {
        try {
            const { name, contact, lastname, email, password } = req.body;
            const userRole = await db.Role.findOne({ where: { name: 'User' } });
            const user = await db.User.create({ name, email, lastname, contact, password });
            await user.addRole(userRole);
            return res.redirect('/auth/login')
        } catch (error) {
            return next(error)
        }
    },
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     * @returns 
     */
    authController(req, res, next) {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
                req.flash('error', 'Erreur lors de la connexion, veuillez recommencer.');
                return next(err);
            }
            if (!user) {
                req.flash('error', 'Email ou mot de passe incorrect.');
                return res.redirect("/auth/login");
            }
            req.logIn(user, (err) => {
                if (err) {
                    req.flash('error', 'Erreur lors de la connexion, veuillez recommencer.');
                    return next(err);
                }
                // Check if the user is an admin or technician
                
                if (user['roles.name'] === 'Admin' || user['roles.name'] === 'Technician') {
                    
                    req.flash('success', 'Welcome! Redirecting to dashboard...');
                    return res.redirect("/dashboard");
                } else {
                    req.flash('success', 'Welcome back! Redirecting to the home page...');
                    return res.redirect("/issue");
                }
            });
        })(req, res, next);
    }
    ,

    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} _next 
     * @returns 
     */
    logoutController(req, res, _next) {
        req.logout(() => {
            return res.redirect("/auth/login");
        });
    }
}