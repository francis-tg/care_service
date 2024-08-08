const session = require("express-session");
const db = require("../models");

class SessionStorage extends session.Store {
    constructor() {
        super();
    }

    async get(sid, callback) {
        try {
            const session = await db.Session.findOne({ where: { sid }, raw: true });
            if (session) {
                return callback(null, JSON.parse(session.data));
            } else {
                return callback(null, null);
            }
        } catch (error) {
            return callback(error);
        }
    }

    async set(sid, sessionData, callback) {
        try {
            const expires = sessionData?.cookie?._expires ? new Date(sessionData.cookie._expires) : new Date(Date.now() + 3600000); // 1 hour default
            const sessionString = JSON.stringify(sessionData);
            const existingSession = await db.Session.findOne({ where: { sid }, raw: true });

            if (existingSession) {
                await db.Session.update(
                    { expires: expires.toISOString(), data: sessionString },
                    { where: { sid } }
                );
            } else {
                await db.Session.create({
                    sid,
                    expires: expires.toISOString(),
                    data: sessionString
                });
            }

            return callback(null);
        } catch (error) {
            return callback(error);
        }
    }

    async destroy(sid, callback) {
        try {
            await db.Session.destroy({ where: { sid } });
            return callback(null);
        } catch (error) {
            return callback(error);
        }
    }
}

module.exports = {SessionStorage};
