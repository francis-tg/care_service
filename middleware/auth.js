const passport = require("passport");
module.exports = {
	/**
	 * 
	 * @param {import("express").Request} req 
	 * @param {import("express").Response} res 
	 * @param {import("express").NextFunction} next 
	 */
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated() && req.user.role!=='User') {
			return next();
		
	    }
		else{
			// req.flash("error_msg", "Not Authorized");
		let path = "/auth/login";
		/* path += req.headers.referer ? `?next=${req.headers.referer}` : ""; */
		
		return res.redirect(path);
		}
	},
	/**
	 * 
	 * @param {import("express").Request} req 
	 * @param {import("express").Response} res 
	 * @param {import("express").NextFunction} next 
	 */
	ensureUserAuthenticated: function (req, res, next) {
		if (req.isAuthenticated() && req.user.role==='User') {
			return next();
		
	    }
		else{
			// req.flash("error_msg", "Not Authorized");
		let path = "/auth/login";
		/* path += req.headers.referer ? `?next=${req.headers.referer}` : ""; */
		
		return res.redirect(path);
		}
	},
	/**
	 * 
	 * @param {import("express").Request} req 
	 * @param {import("express").Response} res 
	 * @param {import("express").NextFunction} next 
	 */
	isAdmin(req, res, next) {
		if (req.isAuthenticated() && req.user.role==='Admin') {
			return next()
		}else{
			return res.status(401).redirect(req.headers.referer)
		}
	},

	protect(){
		
		return passport.authenticate("jwt", { session: false });
		
	},
};
