const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 *
 * @param {String} email
 * @param {String} password
 * @returns
 */
function MailTransporter(email, password) {
	try {

		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: parseInt(process.env.SMTP_PORT || "587"),
			service: process.env.SMTP_SERVICE,
			auth: {
				user: email,
				pass: password??"rfkf azvw rpug dsue",
			},
		});
		return transporter;
	} catch (error) {
		console.log(error);
	}
}

module.exports = { MailTransporter };
