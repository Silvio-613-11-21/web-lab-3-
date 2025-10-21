const db = require("../config/db.js");
const Feedback = require("pg/lib/query");

class FeedbackControllers {

    async AddFeedBack(req, res) {
        try {
            const { client_id, message } = req.body;

            const newFeedback = await db.query('INSERT INTO feedback (client_id, message) VALUES ($1,$2)', [ client_id, message]);
            res.json(newFeedback.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(400).send("Server error");
        }
    }

}

module.exports = new FeedbackControllers;