const passport = require("passport");
module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		
	    }
		else{
			// req.flash("error_msg", "Not Authorized");
		let path = "/auth/login";
		/* path += req.headers.referer ? `?next=${req.headers.referer}` : ""; */
		
		return res.redirect(path);
		}
	},
	isAdmin(req, res, next) {
		let path = "/auth/login";
		path += req.headers.referer ? `?next=${req.headers.referer}` : "";
		if (req.isAuthenticated() && req.user["Role.isAdmin"]) {
			return next();
		}
		if (req.isAuthenticated() && !req.user["Role.isAdmin"])
			return res.status(401).send("Not Authorized");
		else return res.redirect(path);
	},

	protect(){
		
		return passport.authenticate("jwt", { session: false });
		
	},
};
