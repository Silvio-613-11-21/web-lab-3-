const db = require("../config/db");
const materials = require("pg/lib/query");

class OrdersControllers{


    async CreateOrder (req, res) {

        try {
            const {client_id , material_id} = req.params;
            const {height, width, quantity} = req.body;

            const newOrder = await db.query('INSERT INTO orders (client_id, material_id, height, width, quantity) VALUES ($1, $2, $3, $4, $5)', [client_id, material_id, height, width, quantity]);
            res.json(newOrder.rows[0]);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({error: error});
        }

    }

    async getAllOrders (req, res) {
        try{
            const Order = await db.query('SELECT * FROM orders');
            res.json(Order.rows);
        }
        catch (error) {
            console.error(error);
            res.status(500).send({error: error});
        }
    }

}

module.exports = new OrdersControllers;