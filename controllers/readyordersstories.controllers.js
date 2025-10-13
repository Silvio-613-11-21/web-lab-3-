const db = require("../config/db.js");
const ReadyOrdersStories = require("pg/lib/query");

class ReadyOrdersStoriesControllers {

    async AddReadyOrder(req, res) {
        try{
            const { client_id, readyorder_id } = req.params;
            const { quantity } = req.body;

            const newReadyOrdesStories = await db.query ('INSERT INTO readyordersstories (quantity,client_id, readyorder_id) VALUES ($1,$2, $3)',[quantity, client_id, readyorder_id]);
            res.json(newReadyOrdesStories.rows[0]);
        }
        catch(err){
            console.error(err);
            res.status(400).send("Server error");
        }
    }

    async getAllReadyOrders(req, res) {
        try{
            const client_id = req.params.client_id;

            const ReadyOrdersStories = await db.query ('SELECT * FROM readyordersstories WHERE client_id=$1',[client_id]);
            res.json(ReadyOrdersStories.rows);
        }
        catch (error){
            console.error(error);
            res.status(400).send("Server error");
        }
    }
}

module.exports = new ReadyOrdersStoriesControllers;