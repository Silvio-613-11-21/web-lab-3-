const db = require("../config/db");
const client = require("pg/lib/query");
const argon2 = require('argon2');
const validator = require("validator");

async function hashPassword (password) {
    const hash = await argon2.hash(password);
    return hash;
}

async function verifyPassword (hash, password){
    const isMatch = await argon2.verify(hash, password);
    return isMatch;
}

function validatePhone(phoneNumber) {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');

    // Проверяем российские номера в форматах:
    // +7XXXXXXXXXX (11 цифр) или 8XXXXXXXXXX (11 цифр) или XXXXXXXXXX (10 цифр)
    const isValid = /^(8|\+7|7)?\d{10}$/.test(cleanedNumber);

    return isValid;
}

class UserControllers{

    async createUser(req, res){
        const {name, telephone, mail, password} = req.body
        let hash
        const existingNumbers = await db.query('SELECT telephon FROM client WHERE telephon = $1', [telephone]);

        if (validator.isEmail(mail)){
            if (validatePhone(telephone) ){
                if (!(existingNumbers.rows.length > 0)){
                    hash = await hashPassword(password);
                }
                else return res.json({ error: "Телефон уже зарегистрирован"});
            }
            else return res.json({ error: "Ошибка в формате телефона (только Ру-номера)"});
        }
        else return res.json({ error: "Ошибка в почте"});


        const newClient = await db.query('INSERT INTO client (name, telephon, mail, password) values ($1, $2, $3, $4)', [name, telephone, mail, hash]);
        res.json({ "res" : "Пользователь успешно зарегистрирован"});
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