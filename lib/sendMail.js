const path = require("path");
const handlebars = require("handlebars");
const fs = require("fs");
const { MailTransporter } = require("../lib/MailTransporter.js");
const sendMail = async ({ email, subject, template, data }) => {
	const transporter = await MailTransporter(
		process.env.SMTP_USER,
		process.SMTP_PASS,
	);
	const templatePath = path.join(__dirname, "..", "template", template);
	const templateHtml = fs.readFileSync(templatePath, "utf-8");
	const finalTemplate = handlebars.compile(templateHtml);
	const html = finalTemplate(data);
	await transporter.sendMail({
		from: `"CARE SERVICE" <${process.env.SMTP_USER}>`,
		to: email,
		subject,
		html,
		replyTo: "noreply@support.com",
	});
};
module.exports = { sendMail };
