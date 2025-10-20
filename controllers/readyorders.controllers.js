const db = require("../config/db");

const ReadyOrders = require("pg/lib/query");

class ReadyOrdersControllers{

    async createReadyOrder(req, res){
        try{
            const {title , price, info} = req.body;
            const photoFile = req.file;

            let photoBuffer = null;
            if(photoFile){
                photoBuffer = photoFile.buffer;
            }

            const newReadyOrder = await db.query ('INSERT INTO readyorders (title, price, info, photo) VALUES ($1, $2, $3, $4)', [title, price, info, photoBuffer]);

        }
        catch(error) {
            console.error("Error creating ready order:", error);
            res.status(400).send({error: error});
        }

    }

    async getAllReadyOrders(req, res){
        try{
            const ReadyOrders = await db.query ('SELECT * FROM readyorders');
            res.json(ReadyOrders.rows);
        }
        catch(error) {
            console.error("Error getting ready orders from db:", error);
            res.status(400).send({error: error});
        }

    }

    async getOneReadyOrder(req, res){
        try{
            const {id} = req.params;

            const ReadyOrder = await db.query ('SELECT * FROM readyorders WHERE id = $1', [id]);
            res.json(ReadyOrder.rows[0]);
        }
        catch(error) {
            console.error("Error", error);
            res.status(400).send({error: error});
        }
    }

    async deleteReadyOrder(req, res){
        try{
            const {id} = req.params;
            const ReadyOrders = await db.query ('DELETE FROM readyorders WHERE id = $1', [id]);
            res.json(ReadyOrders.rows[0]);
        }
        catch (error) {
            console.error("Error getting ready orders from db:", error);
            res.status(400).send({error: error});
        }
    }

    async findReadyOrder(req, res){
        try {
            const {description} = req.body;

            // Проверяем, что параметр передан
            if (!description) {
                return res.status(400).json({ error: "Description parameter is required" });
            }


            const foundOrders = await db.query(
                'SELECT * FROM readyorders WHERE LOWER(title) LIKE LOWER($1) OR LOWER(info) LIKE LOWER($1)',
                [`%${description}%`]
            );

            res.json({
                searchTerm: description,
                resultsCount: foundOrders.rows.length,
                results: foundOrders.rows
            });

        } catch (error) {
            console.error("Error searching ready orders:", error);
            res.status(500).send({error: error.message});
        }
    }
}


module.exports = new ReadyOrdersControllers;