const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");

function localAuth(passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "username" },
			(username, password, done) => {
				// Match user
				db.User.findOne({
					where: {
						email: username,
					},
					include:['roles'],
					raw: true,
				}).then(async (user) => {
					//const getAdmin = await db.Role.findOne({ where: { name: "Admin" } });
					if (!user && user['roles.name']==='User') {
						console.log("No User Found");

						return done(null, false, {
							message: "Nom d'utilisateur ou mot de passe incorrect",
						});
					}
					
					if (user) {
						// Match password
						bcrypt.compare(password, user.password, async (err, isMatch) => {
							if (err) throw err;

							if (isMatch) {
								return done(null, user);
							} else {
								//console.log("Incorrect");

								return done(null, false, {
									message: "Nom d'utilisateur ou mot de passe incorrect",
								});
							}
						});
					} else {

						return done(null, false, {
							message: "Non authorisé",
						});
					}
				});
			},
		),
	);

	passport.serializeUser(function (user, cb) {
		process.nextTick(function () {
			return cb(null, {
				id: user.id,
				username: user.username,
			});
		});
	});

	passport.deserializeUser(function (user, cb) {
		const { id } = user;
		//User.findByPk(id);
		db.User.findByPk(id, { raw: true,include:['roles'] })
			.then((user) => {
				process.nextTick(function () {
					return cb(null, {...user,role:user['roles.name']});
				});
			})
			.catch((err) => cb(err));
	});
}

function jwtAuth(passport) {
	const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = process.env.SECRET ?? "285qa_àç|/dfeQs@@#";
	passport.use(
		new JwtStrategy(opts, function (jwt_payload, done) {
			db.User.findOne({ where: { id: jwt_payload.id },include:["User_type"],attributes:["id","name","lastname","email","parrain_code","contact","User_type.type","current_location"], raw: true }).then(
				async (user, err) => {
					if (err) {
						return done(err, false);
					}
					if (user) {
						const {password,...data} = user
						process.nextTick(async () => {
							return done(null, data);
						});
					} else {
						return done(null, false);
						// or you could create a new account
					}
				},
			);
		}),
	);
}
module.exports = {
	jwtAuth,
	localAuth,
};
