const db = require("../config/db");
const client = require("pg/lib/query");
const argon2 = require('argon2');

async function hashPassword (password) {
    const hash = await argon2.hash(password);
    return hash;
}

async function verifyPassword (hash, password){
    const isMatch = await argon2.verify(hash, password);
    return isMatch;
}

class UserControllers{

    async createUser(req, res){
        const {name, telephone, mail, password} = req.body;
        const hash = await hashPassword(password);

        const newClient = await db.query('INSERT INTO client (name, telephon, mail, password) values ($1, $2, $3, $4)', [name, telephone, mail, hash]);
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

    //----------------

    async loginUser (req, res){
        try{
            const {telephone, mail, password} = req.body;
            const Client = await db.query ('SELECT id, password FROM client WHERE mail = $1 and telephon = $2 ' , [mail, telephone]);

            //console.log(Client.rows[0].password);
            //console.log(password);

            const isLogin = await verifyPassword(Client.rows[0].password, password);

            if (isLogin === true){
                res.json({"Match": isLogin, "id" : Client.rows[0].id});
            }
            else{
                res.json({"Match": isLogin, error: "Ошибка ввода данных"});
            }
        }
        catch (error){
            console.error(error);
            res.status(400).send("Ошибка ввода данных");
        }
    }

}

module.exports = new UserControllers;