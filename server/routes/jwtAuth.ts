const router = require('express').Router()
const pool = require('../db')
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await pool.query(" SELECT * FROM users WHERE user_email = $1", [email]);
        if(user.rows.length !== 0){
            return res.status(401).send("User already exists")
        }
        const numSalts = 10;
        const salt = await bcrypt.genSalt(numSalts)
        const bcryptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
            [name, email, bcryptPassword]
        );

        res.json(newUser.rows[0])

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router