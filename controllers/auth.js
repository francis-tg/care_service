const passport = require("passport")
module.exports = {
    /**
     * 
     * @param {import("express").Request} _req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} next 
     * @returns 
     */
    loginController(_req,res,next){
        try {
            
            return res.render("auth/login",{layout:false})
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
    authController(req,res,next){
        return passport.authenticate("local", {
            failureRedirect: "/auth/login",
            //successRedirect: "/",
            successRedirect: "/",
            failureFlash: false,
            
        })(req, res, next)
    },
    /**
     * 
     * @param {import("express").Request} req 
     * @param {import("express").Response} res 
     * @param {import("express").NextFunction} _next 
     * @returns 
     */
    logoutController(req,res,_next){
        req.logout(() => {
            return res.redirect("/auth/login");
        });
    }
}