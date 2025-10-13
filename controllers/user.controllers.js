const db = require("../config/db");
const client = require("pg/lib/query");

class UserControllers{

    async createUser(req, res){
        const {name, telephone, mail, password} = req.body;
        const newClient = await db.query('INSERT INTO client (name, telephon, mail, password) values ($1, $2, $3, $4)', [name, telephone, mail, password]);
        res.json(newClient.rows[0]);
    }

    async getOneUser(req, res){
        const id = req.params.id;
        const Client = await db.query ('SELECT * FROM client WHERE id = $1', [id]);
        res.json(Client.rows[0]);
    }

    async getAllUsers(req, res){
        const Client = await db.query ('SELECT * FROM client');
        res.json(Client.rows);
    }

    async updateUser(req, res){
        const {id, name, telephone, mail, password} = req.body;
        const Client = await db.query ('UPDATE client set name = $2, telephon = $3, mail = $4, password = $5  WHERE id = $1  RETURNING *', [id, name, telephone, mail, password]);
        res.json(Client.rows[0]);
    }

    async deleteUser(req, res){
        const id = req.params.id;
        const Client = await db.query ('Delete FROM client WHERE id = $1', [id]);
        res.json(Client.rows[0]);

    }
}

module.exports = new UserControllers;