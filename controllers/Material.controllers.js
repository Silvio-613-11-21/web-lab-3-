const db = require("../config/db");
const materials = require("pg/lib/query");

class MaterialControllers {

    async CreateMaterials (req, res) {
        try{
            const { title, info, price } = req.body;
            const photoFile = req.file;

            let photoBuffer = null;
            if(photoFile){
                photoBuffer = photoFile.buffer;
            }

            const newMaterial = await db.query ('INSERT INTO materials (title, info, price, photo) VALUES ($1, $2, $3, $4)', [title,  info, price, photoBuffer]);

            res.json(newMaterial.rows[0]);
        }
        catch (error) {
            console.error("Error getting materials:", error);
            res.status(500).send({error: error});
        }

    }

    async getAllMaterials(req, res) {
        try {
            const materials = await db.query('SELECT * FROM materials');
            res.json(materials.rows); // ← Исправлено на materials
        }
        catch (error) {
            console.error( error);
            res.status(400).json({ error: error.message });
        }
    }

    async findMaterial (req, res) {
        try {
            const {description} = req.params;

            // Проверяем, что параметр передан
            if (!description) {
                return res.status(500).json({ error: "Description parameter is required" });
            }


            const foundOrders = await db.query(
                'SELECT * FROM materials WHERE LOWER(title) LIKE LOWER($1) OR LOWER(info) LIKE LOWER($1)',
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

    async deleteMaterial (req, res) {
        try{
            const {id} = req.params;
            const Material = await db.query ('DELETE FROM readyorders WHERE id = $1', [id]);
            res.json(Material.rows[0]);
        }
        catch (error) {
            console.error("Error getting ready orders from db:", error);
            res.status(400).send({error: error});
        }
    }
}

module.exports = new MaterialControllers;